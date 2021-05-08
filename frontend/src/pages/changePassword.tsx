import { Flex } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";
import ChangePasswordForm from "../components/form/ChangePasswordForm";

export default function changePassword() {
    return (
        <Container h="100vh">
            <Flex h="100%" align="center" justify="center">
                <ChangePasswordForm />
            </Flex>
        </Container>
        )
}