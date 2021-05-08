import { Flex } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";
import LinkForm from "../components/LinkForm";
import NavBar from "../components/navbar/NavBar";
import useValidate from "../hooks.ts/useValidate";

export default function manage() {
    const {validated, user} = useValidate();

    return validated ?
    (<Container h="100vh">
        <NavBar user={user} />
        <Flex h="100%" alignItems="center" justifyContent="center">
            <LinkForm />
        </Flex>
    </Container>) : <></>
}