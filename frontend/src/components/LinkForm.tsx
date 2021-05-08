import {
  AddIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  CheckCircleIcon,
  CopyIcon,
  Icon
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  CloseButton,
  Code,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useBreakpointValue,
  useColorMode,

  useColorModeValue,

  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { nginxHost } from "../constants";
import useBorderColor from "../hooks.ts/useBorderColor";
import copyToClipBoard from "../utils/copyToClipBoard";
import postBackend from "../utils/postBackend";

export default function LinkForm() {
  const toast = useToast();
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();
  const {colorMode} = useColorMode();
  const arrowIcon = useBreakpointValue({base: ArrowDownIcon, sm: ArrowForwardIcon});
  const formWidth = useBreakpointValue({base: "75vw", sm: "35vw", lg:"350px"});
  const borderColor = useBorderColor();
  const bg = useColorModeValue("gray.50", "tranparent")

  return (
    <>
      <Flex width="full" alignItems="center" justifyContent="center">
        <Box p={4} bg={bg} borderWidth={1} borderRadius={5} boxShadow="lg" borderColor={borderColor}>
          <Formik
            initialValues={{ basePath: "", redirectTo: "" }}
            onSubmit={async ({ basePath, redirectTo }, { setErrors }) => {
              const rawResponse = await postBackend("/add", {
                basePath,
                redirectTo,
              });
              const res = await rawResponse.json();

              if (res.error && res.source == "basePath") {
                if (res.updateAvailable) {
                  modalOnOpen();
                } else {
                  setErrors({ basePath: res.error });
                }
              } else if (res.error && res.source == "redirectTo") {
                setErrors({ redirectTo: res.error });
              } else if (!res.error) {
                openSuccessToast(formatLink(basePath), toast);
              }
            }}
          >
            {({ resetForm, values: {basePath, redirectTo}, isSubmitting }) => (
              <Form>
                <Flex alignItems="center" direction={{base: "column", sm: "row"}}>
                  <Field name="basePath">
                    {({ field, form }) => (
                      <Tooltip
                        isDisabled={!form.errors.basePath}
                        label={form.errors.basePath}
                        bg="red.400"
                      >
                        <FormControl isInvalid={!!form.errors.basePath} w={formWidth}>
                          <InputGroup borderColor={borderColor}>
                            <InputLeftElement
                              pointerEvents="none"
                              children={
                                <Box mb="0.5" color="gray.300">
                                  /
                                </Box>
                              }
                            />
                            <Input
                              {...field}
                              id="basePath"
                              type="text"
                              placeholder="Caminho"
                            />
                          </InputGroup>
                        </FormControl>
                      </Tooltip>
                    )}
                  </Field>
                  <Icon as={arrowIcon} color="gray.500" mx={{base: 0, sm: 3}} my={{base: 2, sm: 0}} fontSize={{base:"3xl", sm: "2xl"}} />

                  <Field name="redirectTo">
                    {({ field, form }) => (
                      <Tooltip
                        isDisabled={!form.errors.redirectTo}
                        label={form.errors.redirectTo}
                        bg="red.400"
                      >
                        <FormControl
                          id="redirectTo"
                          isInvalid={!!form.errors.redirectTo}
                          w={formWidth}
                        >
                          <InputGroup borderColor={borderColor}>
                            <InputLeftElement
                              pointerEvents="none"
                              children={
                                <Box
                                  mb="0.5"
                                  color="gray.300"
                                  fontSize="sm"
                                  px="1"
                                >
                                  Link
                                </Box>
                              }
                            />
                            <Input
                              {...field}
                              id="redirectTo"
                              type="text"
                              placeholder="Redirecionar para..."
                            />
                          </InputGroup>
                        </FormControl>
                      </Tooltip>
                    )}
                  </Field>
                  <Button
                    type="submit"
                    color="teal.500"
                    variant="solid"
                    aria-label="Adicionar link"
                    ml={{base: 0, sm: 3}}
                    mt={{base: 4, sm: 0}}
                    isLoading={isSubmitting}
                    w={{base: "full", sm: "min"}}
                  >
                    <AddIcon />
                  </Button>
                </Flex>
                <Modal isOpen={modalIsOpen} onClose={modalOnClose}>
                  <ModalOverlay />
                  <ModalContent color={colorMode === "dark" ? "white" : undefined}>
                    <ModalHeader>Caminho já usado!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      Se você preferir, você pode sobrescrever o link de <Code children={formatLink(basePath)} />. Deseja fazer isso?
                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={modalOnClose} mr={3}>
                        Cancelar
                      </Button>
                      <Button colorScheme="red" onClick={async () => {
                        await postBackend("/update", {basePath, redirectTo});
                        openSuccessToast(formatLink(basePath), toast);
                        resetForm();
                        modalOnClose();
                      }}>Sim</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </>
  );
}

const formatLink = (basePath: string) => `${nginxHost}/${basePath}`

const openSuccessToast = (link: string, toast: ReturnType<typeof useToast>) => {
  toast({
    title: "Novo link registrado",
    isClosable: true,
    status: "success",
    duration: 15000,
    render: ({ onClose: toastOnClose }) => (
      <Flex
        w="100%"
        bg="green.400"
        color="white"
        pl={5}
        pb={3}
        borderRadius={5}
      >
        <CheckCircleIcon h={19} w={19} mr={2} mt={4} />
        <Flex direction="column" mt={3} flexGrow={1}>
          <Box as="h4" fontSize="lg" fontWeight="bold">
            Novo link criado
          </Box>

          <Flex alignItems="center">
            <Box>{link}</Box>{" "}
            <CopyIcon
              onClick={() => {
                copyToClipBoard(link);
              }}
              cursor="pointer"
              ml={2}
              xlinkTitle="Copiar"
            />
          </Flex>
        </Flex>
        <CloseButton onClick={toastOnClose} size="sm" />
      </Flex>
    ),
  });
}