import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";
import LinkForm from "../components/LinkForm";
import LinkManager from "../components/linkManager/LinkManager";
import NavBar from "../components/navbar/NavBar";
import useValidate from "../hooks.ts/useValidate";

export default function links() {
    const {validated, user} = useValidate();

    return  validated ? (
        <Container h="100%">
            <NavBar user={user} />
            <LinkManager mt={5} />                             
        </Container>
    ) : <></>
}