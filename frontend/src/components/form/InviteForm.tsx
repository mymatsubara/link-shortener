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
import { Formik, Form } from "formik";
import React, { useState } from "react";
import useBorderColor from "../../hooks.ts/useBorderColor";
import postBackend from "../../utils/postBackend";
import FormBox from "./FormBox";
import FormField from "./FormField";

export default function InviteForm() {
  const [adminInvite, setAdminInvite] = useState(false);
  const borderColor = useBorderColor();
  const toast = useToast();

  return (
    <Flex align="center" direction="column">
      <FormBox
        borderColor={borderColor}
      >
        <Flex direction="column" align="center">
          <Heading mb={4} fontSize="3xl">
            Convidar
          </Heading>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async ({ email }, { setErrors }) => {
              const rawResponse = await postBackend("/invite", {
                email,
                role: adminInvite ? "admin" : "user",
              });
              const res = await rawResponse.json();

              if (res.error) {
                setErrors({ email: res.error });
                return;
              }

              toast({
                isClosable: true,
                title: "Convite enviado com sucesso",
                status: "success",
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack direction="column" spacing={5}>
                  <FormField
                    label="Email"
                    placeholder="Email para convidar"
                    name="email"
                    borderColor={borderColor}
                  />
                  <Flex justify="space-between">
                    <Text fontSize="sm">Deseja cadastrar como admin?</Text>
                    <Switch onChange={() => setAdminInvite((v) => !v)} />
                  </Flex>
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
                  Convidar
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
      </FormBox>
      <Box>
        <Text mt={2} maxW="280px" fontSize="sm">
          * O usuário cadastrado poderá criar/alterar links no site
          {adminInvite ? " e convidar outros usuários" : ""}.
        </Text>
      </Box>
    </Flex>
  );
}
