import { NavBar } from "../components/Header/NavBar";
import { A11y, Navigation, Pagination } from "swiper";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/UrqlClient";
import { useRecipesQuery } from "../generated/graphql";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { useState } from "react";
import { CategoryCard } from "../components/Category/CategoryCard";
import { ItemCard } from "../components/Items/ItemCard";
interface IndexProps {}

import "swiper/css";

export const Index: React.FC<IndexProps> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 4,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = useRecipesQuery({ variables });

  return (
    <Layout>
      <Flex alignItems="end" mb={4} p={4}>
        <Heading>Top Categories</Heading>
        <Text ml={4} color="green">
          View All
        </Text>
      </Flex>
      <Divider mb={4} w="15%" />
      <Grid templateColumns="repeat(4, 1fr)" gap={5} marginBottom={5} p={4}>
        <GridItem>
          <CategoryCard
            HeadingName="BreakFast"
            backgroundColor="#F5DE64"
          ></CategoryCard>
        </GridItem>
        <GridItem>
          <CategoryCard
            HeadingName="Lunch"
            backgroundColor="#D5F9A9"
          ></CategoryCard>
        </GridItem>
        <GridItem>
          <CategoryCard
            backgroundColor="#A9F9EA"
            HeadingName="Dinner"
          ></CategoryCard>
        </GridItem>
        <GridItem>
          <CategoryCard
            backgroundColor="#E6D2FF"
            url="https://bit.ly/dan-abramov"
            HeadingName="Dessert"
          ></CategoryCard>
        </GridItem>
      </Grid>

      <Container maxW={"container.xl"}>
        <HStack alignItems="end" mb={4} mt={4} spacing="24px">
          <Heading>Top Items</Heading>

          {data && data.allRecipes.hasMore ? (
            <Button
              variant={"link"}
              colorScheme="teal"
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data!.allRecipes!.Recipes![
                      data!.allRecipes!.Recipes!.length - 1
                    ]!.id.toString(),
                });
              }}
              isLoading={fetching}
              m="auto"
              my={8}
            >
              View More
            </Button>
          ) : null}
        </HStack>

        <Divider mb={4} w="15%" />

        <br />
        {fetching ? (
          <div> loading... </div>
        ) : (
          <Swiper
            spaceBetween={15}
            slidesPerView={4}
            slidesPerGroup={4}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            modules={[Pagination, Navigation, A11y]}
          >
            {data?.allRecipes?.Recipes.map((p) => (
              <>
                <SwiperSlide>
                  <div>
                    <ItemCard
                      HeadingName={p.recipeName}
                      storeName={p.recipeName}
                      storePrice={"9"}
                      storeDescription={""}
                      storeVolume={""}
                    ></ItemCard>{" "}
                  </div>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        )}
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
