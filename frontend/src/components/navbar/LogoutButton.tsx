import { Button, ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import deleteBackend from "../../utils/deleteBackend";

export default function LogoutButton({...props}: ButtonProps) {
  const router = useRouter();

  return (
    <Button
      color="red"
      h="35px"
      onClick={() => {
        localStorage.removeItem("user");
        deleteBackend("/logout");
        router.push("/login");
      }}
      {...props}
    >
      Logout
    </Button>
  );
}
