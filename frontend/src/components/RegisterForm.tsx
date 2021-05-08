import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Switch,
  useToast,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useBorderColor from "../hooks.ts/useBorderColor";
import postBackend from "../utils/postBackend";
import { saveUserToLocalStorage } from "../utils/saveUserToLocalStorage";
import FormBox from "./form/FormBox";
import FormField from "./form/FormField";
import PasswordFormField from "./form/PasswordFormField";

export default function RegisterForm() {
  const borderColor = useBorderColor();
  const router = useRouter();

  return (
    <FormBox borderColor={borderColor}>
      <Flex direction="column" align="center">
        <Heading mb={4} fontSize="3xl">
          Registrar
        </Heading>
        <Formik
          initialValues={{ username: "", password: "", confirmPassword: "" }}
          onSubmit={async (
            { username, password, confirmPassword },
            { setErrors }
          ) => {
            if (password !== confirmPassword) {
              setErrors({
                confirmPassword: "As senhas digitadas não são iguais",
              });
              return;
            }

            const rawResponse = await postBackend("/register", {
              username,
              password,
              key: router.query.key,
            });
            const res = await rawResponse.json();

            if (res.error) {
              setErrors({ username: res.error });
              return;
            }

            saveUserToLocalStorage(res);
            router.push("/manage");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack direction="column" spacing={5}>
                <FormField
                  label="Usuário"
                  placeholder="Usuário"
                  name="username"
                  borderColor={borderColor}
                />
                <PasswordFormField
                  label="Senha"
                  placeholder="Senha"
                  name="password"
                  borderColor={borderColor}
                />
                <PasswordFormField
                  label="Confirme a senha"
                  placeholder="Senha novamente"
                  name="confirmPassword"
                  borderColor={borderColor}
                />
              </Stack>
              <Button
                type="submit"
                color="teal"
                variant="solid"
                aria-label="Registrar"
                isLoading={isSubmitting}
                w="full"
                my={6}
                borderColor={borderColor}
                border="solid 1px"
              >
                Registrar
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </FormBox>
  );
}
