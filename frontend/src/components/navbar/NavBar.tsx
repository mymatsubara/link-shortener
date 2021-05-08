import { Flex, FlexProps, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { MeResponse } from "../../hooks.ts/useGetUser";
import GreetingText from "./GreetingText";
import LogoutButton from "./LogoutButton";
import MenuLinks from "./MenuLinks";
import MenuLogo from "./MenuLogo";
import MenuToggle from "./MenuToggle";
import NavBarContainer from "./NavBarContainer";

export default function NavBar({ user, ...props }: FlexProps & { user: MeResponse }) {
  const [isOpen, setIsOpen] = useState(false);
  const bgColor = useColorModeValue("gray.300", "gray.800")

  const toggle = () => {
    setIsOpen((value) => !value);
  };

  return (
    <NavBarContainer bg={{base: bgColor, sm: "transparent"}} {...props}>
      <Flex
        w={{base: "100%", sm: "auto"}}
        justify="space-between"
      >
        <MenuLogo />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        display={{ base: isOpen ? "flex" : "none", sm: "flex" }}
        w="100%"
        justify={{base: "center", sm: "space-between"}}
        align={{base: "stretch", sm: "flex-end"}}
        ml={{base: 0, sm: 20}}
      >
        <MenuLinks isUserAdmin={user.role === "admin"} />
        <GreetingText username={user.username} mr={5} display={{base: "none", sm: "flex"}}/>
        <LogoutButton mt={{base: 2, sm: 0}} />
      </Flex>
    </NavBarContainer>
  );
}
