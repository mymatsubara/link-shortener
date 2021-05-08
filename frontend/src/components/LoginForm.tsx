import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useBorderColor from "../hooks.ts/useBorderColor";
import postBackend from "../utils/postBackend";
import { saveUserToLocalStorage } from "../utils/saveUserToLocalStorage";
import { ErrorDisplay } from "./ErrorDisplay";
import FormBox from "./form/FormBox";

export default function LoginForm() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const borderColor = useBorderColor();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(JSON.stringify({ username: user, password: password }));
    const rawResponse = await postBackend("/login", {
      username: user,
      password,
    });
    const res = await rawResponse.json();
    if (res.error) {
      setError(res.error);
    } else if (res.id) {
      saveUserToLocalStorage(res);
      router.push("/manage");
    } else {
      setError("Erro inesperado ocorreu");
    }

    setIsLoading(false);
  };

  return (
    <Flex width="full" alignItems="center" justifyContent="center">
      <FormBox borderColor={borderColor}>
        <Box textAlign="center">
          <Heading fontSize="3xl">Login</Heading>
        </Box>
        {error ? <ErrorDisplay errorMessage={error} /> : undefined}
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Usuário</FormLabel>
              <Input
                type="text"
                placeholder="Usuário"
                size="lg"
                onChange={(e) => setUser(e.currentTarget.value)}
                id="user"
                borderColor={borderColor}
              />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Senha"
                  size="lg"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  id="password"
                  borderColor={borderColor}
                />                
                <InputRightElement width="3rem" mt="1">
                  <Button
                    tabIndex={-1}
                    size="sm"
                    onClick={() => setPasswordVisible((v) => !v)}
                  >
                    {passwordVisible ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Link href="/forgotPassword">Esqueci minha senha</Link>
            </FormControl>
            <Button
              color="teal"
              variant="solid"
              type="submit"
              w="full"
              mt={6}
              mb={4}
              border="solid 1px"
              borderColor={borderColor}
            >
              {" "}
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Box>
      </FormBox>
    </Flex>
  );
}
