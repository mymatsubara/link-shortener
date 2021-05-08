import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

interface MenuToggle {
    toggle: () => void,
    isOpen: boolean;
}

export default function MenuToggle({ toggle, isOpen}) {
    return (
        <Button display={{base: "block", sm: "none"}} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </Button>
    )
}