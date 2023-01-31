import {
  Box,
  Heading,
  VStack,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface PriceBoxProps {}

export const PriceBox: React.FC<PriceBoxProps> = ({}) => {
  return (
    <Card p={4} m={4} w="inherit">
      <CardBody>
        <Stack divider={<StackDivider w={10} />} spacing="4">
          <Heading> Price </Heading>

          <Flex>
            <VStack>
              <Checkbox size="md" colorScheme="red">
                Checkbox
              </Checkbox>
              <Checkbox size="md" colorScheme="green" defaultChecked>
                Checkbox
              </Checkbox>
              <Checkbox size="md" colorScheme="orange" defaultChecked>
                Checkbox
              </Checkbox>
            </VStack>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};
