import { NextPage } from "next";
import { createUrqlClient } from "../../../utils/UrqlClient";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecipesbyIdQuery } from "../../../generated/graphql";
import { Layout } from "../../../components/Layout";
import { CategoryHeader } from "../../../components/Category/CategoryHeader";
import { CategoryBody } from "../../../components/Category/CategoryBody";

const Food: NextPage<{}> = ({}) => {
  const router = useRouter();

  const categoryPath = (router.query.category as string[]) || [];

  console.log(categoryPath, "Individual Item Path");

  const title = categoryPath.at(-1);
  console.log(title);

  const intId =
    typeof router.query.id === "number" ? parseInt(router.query.id) : 1;

  const [{ data, fetching }] = useRecipesbyIdQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <div>Loading ... </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout variant="regular">
        <CategoryHeader Header={title} />
        <CategoryBody />
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Food);
