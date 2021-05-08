import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import LogoutButton from "./LogoutButton";
import MenuLink from "./MenuLink";

interface MenuLinksProps {
  isUserAdmin?: boolean;
}

export default function MenuLinks({ isUserAdmin = false }: MenuLinksProps) {
  return (
    <Stack
      my={{base: 4, sm: 0}}
      spacing={{base: 4, sm: 10}}
      w={{ base: "full", sm: "full" }}
      align={{ base: "center", sm: "flex-start" }}
      justify={{ base: "center", sm: "flex-start" }}
      direction={{ base: "column", sm: "row" }}
    >
      <MenuLink href="/manage">Início</MenuLink>
      <MenuLink href="/links">Links</MenuLink>
      {isUserAdmin ? (
        <MenuLink href="/invite">Convidar Usuário</MenuLink>
      ) : undefined}
    </Stack>
  );
}
