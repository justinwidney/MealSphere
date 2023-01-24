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
} from "@chakra-ui/react";
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
    <Card w="100%" mb={20} {...props} mr={0} ml={0}>
      <CardBody>
        <Heading mb={4} size="sm">
          {HeadingName}
        </Heading>

        <Box w="50%">
          <Stack spacing="0" mb={4}>
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
              {" "}
              Tes{" "}
            </Button>
            <Button borderRadius={0} colorScheme="green" variant="solid">
              Fav
            </Button>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  );
};
