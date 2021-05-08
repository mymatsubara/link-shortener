import { Box, Flex, useColorMode } from "@chakra-ui/react";
import React from "react";

export const Container = (props) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.200", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    >
      {props.children}
      <Box position="absolute" bg={bgColor[colorMode]} h="100vh" w="100%" zIndex={-1} />
    </Flex>
  );
};
