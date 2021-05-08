import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export default function FormBox({ children, ...props }: BoxProps) {
    const bg = useColorModeValue("gray.50", "transparent")

  return (
    <Box
      pt={8}
      px={8}
      maxWidth="500px"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      bg={bg}
      {...props}
    >
      {children}
    </Box>
  );
}
