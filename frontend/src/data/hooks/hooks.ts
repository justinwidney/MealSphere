import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { request, RequestDocument } from "graphql-request";
import { TypedDocumentNode } from "urql";

interface userQuery {
  redirectTo: string;
  redirectIfFound: Boolean;
}

const ISSERVER = typeof window === "undefined";

//const fetcher = (query: RequestDocument, requestHeaders: {}) =>
//  request("http:localhost:4000/graphql", query, requestHeaders,);

const fetcher = async (
  query: RequestDocument,
  requestHeaders: { authorization: string }
) => {
  const response = await fetch("http://localhost:4000/graphql", {
    body: JSON.stringify({ query }),
    headers: {
      "Content-type": "application/json",
      Authorization: requestHeaders.authorization,
    },
    method: "POST",
  });
  const { data } = await response.json();
  return data;
};

export function useUser({ redirectTo, redirectIfFound }: userQuery) {
  if (!ISSERVER) {
    const token = localStorage.getItem("token");
    console.log(token);

    const requestHeaders = {
      authorization: `Bearer ${token}`,
    };

    const { data, error } = useSWR(
      [
        `{
     currentUser {
        id
        username
    }
    }`,
        requestHeaders,
      ],
      fetcher
    );

    const user = data?.currentUser?.id;

    console.log(data);

    const finished = Boolean(data);
    const hasUser = Boolean(user);

    useEffect(() => {
      if (redirectTo || !finished) return;
      if (
        // If redirectTo is set, redirect if the user was not found.
        (redirectTo && !redirectIfFound && !hasUser) ||
        // If redirectIfFound is also set, redirect if the user was found
        (redirectIfFound && hasUser)
      ) {
        Router.push(redirectTo);
      }
    }, [redirectTo, redirectIfFound, finished, hasUser]);

    return error ? null : user;
  }
}
