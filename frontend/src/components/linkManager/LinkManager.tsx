import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from "@chakra-ui/icons";
import { FlexProps } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Code,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorMode,
  useDisclosure,
  Text,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import useBorderColor from "../../hooks.ts/useBorderColor";
import deleteBackend from "../../utils/deleteBackend";
import getBackend from "../../utils/getBackend";
import LinkRow from "./LinkRow";

export interface LinkResponse {
  id: number;
  basePath: string;
  redirectTo: string;
}

const PAGE_SIZE = 10;

export default function LinkManager({ ...props }: FlexProps) {
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();
  const [selectedLink, setSelectedLink] = useState<LinkResponse>();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { colorMode } = useColorMode();
  const deleteLink = (link: LinkResponse) => {
    setSelectedLink(link);
    modalOnOpen();
  };

  const [pages, setPages] = useState(new Map<number, LinkResponse[]>());
  const [query, setQuery] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [updateCount, setUpdateCount] = useState(0);
  const borderColor = useBorderColor();

  const fetchPage = async (n: number, query: string) => {    
    if (!pages.has(n)) {      
      let cursor;
      let pagesToSkip = 0;
      pages.forEach((p, i) => {
        if (i < n) {
          cursor = p[p.length - 1].id;
          pagesToSkip = n - i - 1;
        }
      });

      const response = await getBackend(
        `/paths?pageSize=${PAGE_SIZE}${n == 1 ? "&count=true" : ""}${
          cursor ? `&cursor=${cursor}` : ""
        }${pagesToSkip ? `&pagesToSkip=${pagesToSkip}` : ""}${
          query ? `&query=${query}` : ""
        }`
      );

      const { links, count } = await response.json();
      setPages((p) => p.set(n, links));
      if (count) {
        setPageCount(count == 0 ? 0 : Math.ceil(count / PAGE_SIZE));
      }
      
      setUpdateCount(c => c + 1);
    }
  };

  useEffect(() => {
    fetchPage(curPage, query);
    
  }, [curPage, query]);

  return (
    <>
      <Flex direction="column" align="center" {...props}>
        <form
          onSubmit={async (e) => {            
            e.preventDefault();
            if (e.target["pesquisar"].value != query) {
              setQuery(e.target["pesquisar"].value);
              setCurPage(1);
              setPages(new Map<number, LinkResponse[]>());
            }
          }}
        >
          <InputGroup size="lg" mb={6} w={500} borderColor={borderColor}>
            <Input name="pesquisar" pr="4.5rem" placeholder="Pesquisar" />
            <InputRightElement width="4.5rem">
              <IconButton
                variant="ghost"
                type="submit"
                aria-label="Pesquisar"
                size="md"
                icon={<SearchIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </form>
        {pages.has(curPage) && pages.get(curPage)?.length != 0 ? (
          pages.get(curPage).map((l) => (
            <Box key={l.id} mb={5}>
              <LinkRow
                link={l}
                borderColor={borderColor}
                onDeleteClick={deleteLink}
              />
            </Box>
          ))
        ) : undefined}
        {/* Page Buttons */}
        {pageCount ? (
          <Stack direction="row" mt={4} mb={8} spacing={3} justify="center">
            {curPage != 1 ? (
              <IconButton aria-label="Previous page" icon={<ArrowLeftIcon />} />
            ) : undefined}
            {Array.from({ length: 12 }, (_, i) => i + curPage - 3)
              .filter((n) => n > 0 && n <= pageCount)
              .map((n) => (
                <Button
                  key={`page${n}`}
                  colorScheme="blue"
                  variant={n == curPage ? "solid" : "outline"}
                  onClick={() => setCurPage(n)}
                >
                  {n}
                </Button>
              ))}
            {curPage != pageCount ? (
              <IconButton
                aria-label="Next page"
                icon={<ArrowRightIcon />}
                onClick={() => setCurPage(curPage + 1)}
              />
            ) : undefined}
          </Stack>
        ) : <Text mt="20vh" fontSize="xl">No results found</Text>}
      </Flex>

      {/* Modal for link delete */}
      <Modal isOpen={modalIsOpen} onClose={modalOnClose}>
        <ModalOverlay />
        <ModalContent color={colorMode === "dark" ? "white" : undefined}>
          <ModalHeader>Deseja realmente deletar?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedLink ? (
              <>
                Você tem certeza que deseja deletar o link associado ao caminho
                <Code mx={1} children={`/${selectedLink.basePath}`} />?
              </>
            ) : undefined}
          </ModalBody>

          <ModalFooter>
            <Button onClick={modalOnClose} mr={3}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              isLoading={isDeleteLoading}
              onClick={async () => {
                setIsDeleteLoading(true);
                const response = await deleteBackend("/path", {
                  id: selectedLink.id,
                });
                const { error } = await response.json();
                if (!error) {
                  setPages((p) => {
                    const newPage = p
                      .get(curPage)
                      .filter((p) => p.id !== selectedLink.id);
                    return pages.set(curPage, newPage);
                  });
                }
                setIsDeleteLoading(false);
                modalOnClose();
              }}
            >
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
