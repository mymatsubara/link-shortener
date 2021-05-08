import { Flex } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";
import InviteForm from "../components/form/InviteForm";
import NavBar from "../components/navbar/NavBar";
import useValidate from "../hooks.ts/useValidate";

export default function invite() {
    const {validated, user} = useValidate();

    return (
        validated ? 
        <Container h="100vh">
            <NavBar user={user} />
            <Flex h="100%" justify="center" align="center">
                <InviteForm />
            </Flex>
        </Container> : <></>
    )
}