import { Flex, FlexProps, Text } from "@chakra-ui/react";
import React from "react";

export default function GreetingText({
  username,
  ...props
}: FlexProps & { username: string }) {
  return (
    <Flex align="flex-end" {...props}>
      <Text whiteSpace="nowrap" fontWeight="light" fontSize="sm" mr={2}>
        Olá,{" "}
      </Text>
      <Text fontWeight="bold" letterSpacing="2px">
        {username}
      </Text>
    </Flex>
  );
}
