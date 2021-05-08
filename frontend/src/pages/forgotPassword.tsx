import { Flex } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";
import ForgotPasswordForm from "../components/form/ForgotPasswordForm";

export default function forgotPassword() {
    return (
        <Container h="100vh">
            <Flex h="100%" align="center" justify="center">
                <ForgotPasswordForm />
            </Flex>
        </Container>
        )
}