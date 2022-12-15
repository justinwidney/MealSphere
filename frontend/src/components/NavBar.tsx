import { Box, Flex, Link, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { useUser } from "../data/hooks/hooks";
import { useRouter } from "next/router";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const user = useUser({ redirectTo: "/", redirectIfFound: false });
  let body = null;

  const router = useRouter();

  const handleSubmit = async () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (!user) {
    body = (
      <>
        <Flex>
          <NextLink href="/login" legacyBehavior passHref>
            <Link mr={2}>Login</Link>
          </NextLink>
          <NextLink href="/register" legacyBehavior passHref>
            <Link>register</Link>
          </NextLink>
        </Flex>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{user}</Box>
        <Button onClick={handleSubmit} variant="link">
          Logout
        </Button>
        ;
      </Flex>
    );
  }

  return (
    <Flex zIndex={2} position="sticky" top={0} bg="tan" p={4} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
