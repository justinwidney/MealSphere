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
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightElement,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MenuOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper";
import { ItemCard } from "../Items/ItemCard";
import { useRecipesQuery } from "../../generated/graphql";
import InfiniteScroll from "react-infinite-scroll-component";

interface AllItemsProps {}

export const AllItems: React.FC<AllItemsProps> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 12,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = useRecipesQuery({ variables });

  const fetchMoreData = () => {
    setVariables({
      limit: variables.limit,
      cursor:
        data!.allRecipes!.Recipes![
          data!.allRecipes!.Recipes!.length - 1
        ]!.id.toString(),
    });
  };

  return (
    <>
      <Box w={"inherit"} borderWidth="1px" paddingLeft={10} paddingRight={10}>
        <HStack paddingBottom={4} pt={4}>
          <Heading fontSize={20}>Filter By</Heading>
          <Select placeholder="Dietary" w="125px">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Select placeholder="Deals" w="125px">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Select placeholder="Store" w="125px">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <InputGroup w={"400px"}>
            <InputLeftAddon borderRadius="10" children="ALL" />
            <Input
              borderRadius="10"
              placeholder="Search for Product, Categories."
            />
            <InputRightElement children={"test"} />
          </InputGroup>
          <Heading fontSize={20}>Sort By</Heading>
          <Select placeholder="Store" w="100px">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </HStack>

        {fetching ? (
          <div> loading... </div>
        ) : (
          <InfiniteScroll
            dataLength={data?.allRecipes.Recipes?.length}
            next={fetchMoreData}
            hasMore={data?.allRecipes.hasMore}
            loader={<h4>Loading...</h4>}
          >
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              {data?.allRecipes!.Recipes!.map((_p) => (
                <>
                  <GridItem>
                    <ItemCard
                      key={_p?.id}
                      marginBottom={10}
                      HeadingName={_p!.recipeName}
                      storeName={_p!.recipeName}
                      storePrice={"9"}
                      storeDescription={""}
                      storeVolume={""}
                    ></ItemCard>{" "}
                  </GridItem>
                </>
              ))}
            </Grid>
          </InfiniteScroll>
        )}
      </Box>
    </>
  );
};
