import { NavBar } from "../components/NavBar";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/UrqlClient";
import { useRecipesQuery } from "../generated/graphql";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { useState } from "react";
interface IndexProps {}

export const Index: React.FC<IndexProps> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = useRecipesQuery({ variables });

  return (
    <Layout>
      <Flex>
        <Heading>Recipes</Heading>
      </Flex>
      <br />
      {fetching ? (
        <div> loading... </div>
      ) : (
        <Stack spacing={8} mb={4}>
          {data?.allRecipes?.Recipes?.map((p) => (
            <Box key={p!.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p!.recipeName}</Heading>
              <Text mt={4}>{p!.instructionssnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.allRecipes.hasMore ? (
        <Flex>
          <Button
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
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
