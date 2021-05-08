import { ArrowDownIcon, ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  useBreakpointValue,
  Text,
  FlexProps,
  Link,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { LinkResponse } from "./LinkManager";

interface LinkRowProps {
  link: LinkResponse;
  onDeleteClick: (link: LinkResponse) => void
}

export default function LinkRow({ link, onDeleteClick, ...props }: LinkRowProps & FlexProps) {
  const arrowIcon = useBreakpointValue({
    base: ArrowDownIcon,
    sm: ArrowForwardIcon,
  });

  return (
    <Flex borderWidth={1} borderRadius={8} align="center" bg="#fff1" {...props}>
      {/* Link Info */}
      <Flex p={3} align="center">
        <LinkInfo
          symbol="/"
          info={link.basePath}
          borderColor={props.borderColor}
          width={300}
        />
        <Icon
          as={arrowIcon}
          color="gray.500"
          mx={{ base: 0, sm: 3 }}
          my={{ base: 2, sm: 0 }}
          fontSize={{ base: "3xl", sm: "2xl" }}
        />
        <LinkInfo
          symbol="Link"
          info={link.redirectTo}
          borderColor={props.borderColor}
          width={400}
          isLink
        />
      </Flex>

      {/* Buttons */}
      <Button
        type="submit"
        color="red.500"
        variant="solid"
        aria-label="Adicionar link"
        ml={{ base: 0, sm: 3 }}
        mt={{ base: 4, sm: 0 }}
        w={{ base: "full", sm: "min" }}
        mr={4}
        onClick={() => onDeleteClick(link)}
      >
        <DeleteIcon />
      </Button>
    </Flex>
  );
}

interface LinkInfoProps {
  symbol: string;
  info: string;
  isLink?: boolean;
}

function LinkInfo({
  symbol,
  info,
  isLink,
  ...props
}: LinkInfoProps & FlexProps) {
  return (
    <Flex borderWidth={1} borderRadius={5} padding={1} {...props}>
      <Box mb="0.5" color="gray.300" mx={2}>
        {symbol}
      </Box>
      <Text isTruncated>{isLink ? <Link href={info}>{info}</Link> : info}</Text>
    </Flex>
  );
}
