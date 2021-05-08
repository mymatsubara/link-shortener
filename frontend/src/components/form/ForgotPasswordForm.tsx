import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useToast
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import useBorderColor from "../../hooks.ts/useBorderColor";
import postBackend from "../../utils/postBackend";
import FormBox from "./FormBox";
import FormField from "./FormField";

export default function ForgotPasswordForm() {
  const borderColor = useBorderColor();
  const toast = useToast();

  return (
    <Flex align="center" direction="column">
      <FormBox
        borderColor={borderColor}
      >
        <Flex direction="column" align="center">
          <Heading mb={4} fontSize="2xl">
            Esqueci minha senha
          </Heading>
          <Formik
            initialValues={{ username: "" }}
            onSubmit={async ({ username }, { setErrors }) => {
              const rawResponse = await postBackend("/forgotPassword", {
                username,
              });
              const res = await rawResponse.json();

              if (res.error) {
                setErrors({ username: res.error });
                return;
              }

              toast({
                isClosable: true,
                title: "Email enviado",
                description: res.success,
                status: "success",
                duration: 10000,
              });
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
                  Enviar
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
      </FormBox>
    </Flex>
  );
}
