import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  Flex,
  Button,
  Box,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react";

import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";

import React from "react";

interface ItemCardProps {
  HeadingName: string;
  storeName: string;
  storeDescription: string;
  storePrice: string;
  storeVolume: string;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  HeadingName,
  storeName,
  storeDescription,
  storePrice,
  storeVolume,
  ...props
}) => {
  return (
    <Card
      w="100%"
      mb={20}
      {...props}
      mr={0}
      ml={0}
      variant="outline"
      borderRadius={3}
    >
      <CardBody>
        <HStack>
          <Box w="50%">
            <Stack spacing="0" mb={4}>
              <Flex>
                <Heading fontSize={16} pb={2}>
                  {" "}
                  {HeadingName}{" "}
                </Heading>
              </Flex>

              <Flex>
                <Text fontSize="xs">{storeName}</Text>
                <Text fontSize="xs" ml="auto">
                  {storePrice}
                </Text>
              </Flex>
              <Flex>
                <Text fontSize="xs">{storeName}</Text>
                <Text fontSize="xs" ml="auto">
                  {storePrice}
                </Text>
              </Flex>
            </Stack>
            <Flex>
              <Text>Best Option</Text>
            </Flex>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>

            <Flex alignItems="end" mb={-10} mt={4}>
              <Button borderRadius={0} background="white" variant="outline">
                <HeartOutlined />
              </Button>
              <Button borderRadius={0} colorScheme="teal" variant="solid">
                <ShoppingCartOutlined />
              </Button>
            </Flex>
          </Box>
          <Box w="50%">
            <Image src="https://bit.ly/dan-abramov"></Image>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};
