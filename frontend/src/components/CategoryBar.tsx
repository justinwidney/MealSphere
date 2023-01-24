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
  Spacer,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { useUser } from "../data/hooks/hooks";
import { useRouter } from "next/router";
import { MenuOutlined } from "@ant-design/icons";

interface CategoryBarProps {}

export const CategoryBar: React.FC<CategoryBarProps> = ({}) => {
  const user = useUser({ redirectTo: "/", redirectIfFound: false });

  const router = useRouter();

  return (
    <Flex
      zIndex={2}
      position="sticky"
      top={0}
      p={4}
      alignItems="center"
      textAlign={"center"}
    >
      <HStack spacing="24px">
        <HStack>
          <MenuOutlined />
          <Text fontSize="md">All Categories</Text>
        </HStack>

        <Spacer />

        <Link fontSize="md">Fresh Fruit and Vegetables</Link>
        <Link fontSize="md">Meat Products</Link>
        <Link fontSize="md">Dairy and Eggs</Link>
        <Link fontSize="md">Pantry Products</Link>
        <Link fontSize="md">Frozen Products</Link>
      </HStack>
    </Flex>
  );
};
