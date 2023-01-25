import {
  Box,
  Flex,
  Link,
  Button,
  Heading,
  Text,
  Center,
  HStack,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { useUser } from "../../data/hooks/hooks";
import { useRouter } from "next/router";
interface TopBarProps {}

export const TopBar: React.FC<TopBarProps> = ({}) => {
  const user = useUser({ redirectTo: "/", redirectIfFound: false });

  const router = useRouter();

  return (
    <Flex
      zIndex={2}
      top={0}
      bg="#F3F3F3"
      p={4}
      alignItems="center"
      textAlign={"center"}
    >
      <HStack>
        <Text fontSize="md">Store Area</Text>

        <Text color={"green"} fontSize="md">
          4101 Bassel Street, Montreal, QC H3A 1T1
        </Text>
      </HStack>

      <Box ml={"auto"}>
        <HStack>
          <Select color="black" variant="unstyled" placeholder="English">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Select paddingRight={0} variant="unstyled" placeholder="$CAD">
            <option value="option1">$USD</option>
            <option value="option2">$AUD</option>
          </Select>
        </HStack>
      </Box>
    </Flex>
  );
};
