import {
  Box,
  Flex,
  Link,
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  HStack,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
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
    <Flex zIndex={2} position="sticky" top={0} bg="white" p={4} ml={"auto"}>
      <HStack>
        <Box ml={"left"}>
          <Text> MealSphere</Text>
        </Box>

        <Stack spacing={4}>
          <InputGroup w={"1000px"}>
            <InputLeftAddon borderRadius="10" children="ALL" />
            <Input
              borderRadius="10"
              placeholder="Search for Product, Categories."
            />
            <InputRightElement children={"test"} />
          </InputGroup>
        </Stack>

        <Button colorScheme="pink" variant="solid">
          PasteList
        </Button>
        <Button colorScheme="teal" variant="outline">
          {"Cart"}
        </Button>
      </HStack>

      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
