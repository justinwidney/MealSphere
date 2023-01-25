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
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MenuOutlined } from "@ant-design/icons";
import { CategorySearchBox } from "./CategorySearchBox";
import { OptionsBox } from "./OptionsBox";
import { PriceBox } from "./PriceBox";
import { AllItems } from "./AllItems";
import { SaleItems } from "./SaleItems";

interface CategoryBodyProps {}

export const CategoryBody: React.FC<CategoryBodyProps> = ({}) => {
  return (
    <Flex>
      <VStack justifyContent={"flex-start"}>
        <CategorySearchBox />
        <PriceBox />
        <OptionsBox />
      </VStack>
      <VStack w={1200}>
        <SaleItems />
        <AllItems />
      </VStack>
    </Flex>
  );
};
