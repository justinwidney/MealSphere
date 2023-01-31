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
import { useRouter } from "next/router";
import { MenuOutlined } from "@ant-design/icons";

interface CategoryHeaderProps {
  Header: String;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ Header }) => {
  let fruits = [
    { label: "Apple", value: "Apple" },
    { label: "Banana", value: "Banana" },
    { label: "Orange", value: "Orange" },
  ];

  return (
    <>
      <Flex
        zIndex={2}
        p={4}
        alignItems="center"
        textAlign={"center"}
        justifyContent="center"
      >
        <Heading> {Header} </Heading>
      </Flex>
      <HStack margin={4} justifyContent="flex-start" pb={4}>
        {fruits?.map((_p) => (
          <Button width="15%" key={_p.value}>
            {" "}
            {_p.value}{" "}
          </Button>
        ))}
      </HStack>
    </>
  );
};
