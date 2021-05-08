import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

export default function NavBarContainer({ children, ...props }: FlexProps) {
  return (
    <Flex
      as="nav"
      align={{base: "center", sm: "flex-end"}}
      justify="space-between"
      w="100%"
      p= "1rem"
      flexDir={{base: "column", sm: "row"}}
      {...props}
    >
      {children}
    </Flex>
  );
}
