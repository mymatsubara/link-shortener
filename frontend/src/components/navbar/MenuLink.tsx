import { Box, Link, Text, TextProps } from "@chakra-ui/react";
import React from "react";

export default function MenuLink({
  children,
  href,
  ...props
}: { href: string } & TextProps) {
  return (
    <Link _hover={{textDecor: "none"}} href={href}>
      <Box textTransform="capitalize" letterSpacing="2px" fontSize="lg"  {...props}>
        {children}
      </Box>
    </Link>
  );
}
