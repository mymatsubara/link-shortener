import { Flex } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";
import RegisterForm from "../components/RegisterForm";

export default function register() {
    return (
        <Container h="100vh">
            <Flex h="100%" align="center" justify="center">
                <RegisterForm />
            </Flex>
        </Container>
        )
}