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
  Stack,
  Card,
  CardBody,
  StackDivider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MenuOutlined } from "@ant-design/icons";

interface OptionsBoxProps {}

export const OptionsBox: React.FC<OptionsBoxProps> = ({}) => {
  return (
    <Card p={4} m={4}>
      <CardBody>
        <Stack divider={<StackDivider w={10} />} spacing="4">
          <Heading> Meat Products</Heading>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Overview
            </Heading>
            <Text pt="2" fontSize="sm">
              Check out the overview of your clients.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
