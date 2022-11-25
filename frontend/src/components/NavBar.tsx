import { Box, Flex, Link, Button } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useCurrentUserQuery } from "../generated/graphql";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useCurrentUserQuery();

  let body = null;

  if (fetching) {
    console.log("fetching");
  } else if (!data?.currentUser) {
    console.log(data);

    body = (
      <>
        <NextLink href="/login" legacyBehavior passHref>
          <Link>Login</Link>
        </NextLink>
        <NextLink href="/register" legacyBehavior passHref>
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.currentUser.id}</Box>
        <Button variant="link">Logout</Button>;
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
