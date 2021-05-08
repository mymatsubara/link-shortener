import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Container } from "../components/Container";
import LoginForm from "../components/LoginForm";
import useGetUserInfo from "../hooks.ts/useGetUser";

export default function login() {
  const router = useRouter();
  const [{ id }, finished] = useGetUserInfo();

  useEffect(() => {
    if (id) {
        router.push("/manage");
    }
  }, [id]);

  return finished && !id ? (
    <Container h="100vh" alignItems="center" justifyContent="center">
      <LoginForm />
    </Container>
  ) : <></>;
}
