import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useToast
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useBorderColor from "../../hooks.ts/useBorderColor";
import patchBackend from "../../utils/patchBackend";
import postBackend from "../../utils/postBackend";
import { saveUserToLocalStorage } from "../../utils/saveUserToLocalStorage";
import FormBox from "./../form/FormBox";
import FormField from "./../form/FormField";
import PasswordFormField from "./../form/PasswordFormField";

export default function ChangePasswordForm() {
  const borderColor = useBorderColor();
  const router = useRouter();
  const toast = useToast();

  return (
    <FormBox borderColor={borderColor}>
      <Flex direction="column" align="center">
        <Heading mb={4} fontSize="3xl">
          Nova Senha
        </Heading>
        <Formik
          initialValues={{ newPassword: "", confirmNewPassword: "" }}
          onSubmit={async (
            {  newPassword, confirmNewPassword },
            { setErrors }
          ) => {
            if (newPassword !== confirmNewPassword) {
              setErrors({
                confirmNewPassword: "As senhas digitadas não são iguais",
              });
              return;
            }

            const rawResponse = await patchBackend("/password", {
              newPassword,
              key: router.query.key,
            });
            const res = await rawResponse.json();

            if (res.error) {
              setErrors({ newPassword: res.error });
              return;
            }

            const toastDuration = 4000;

            toast({
              title: "Senha alterada",
              description: "Você será redirecionado em alguns instantes.",
              isClosable: true,
              duration: toastDuration,
              status: "success"
            })
            setTimeout(() => {
              router.push("/manage");
            }, toastDuration);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack direction="column" spacing={5}>
                <PasswordFormField
                  label="Nova senha"
                  placeholder="Nova senha"
                  name="newPassword"
                  borderColor={borderColor}
                />
                <PasswordFormField
                  label="Confirme a nova senha"
                  placeholder="Nova senha novamente"
                  name="confirmNewPassword"
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
                Alterar Senha
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </FormBox>
  );
}
