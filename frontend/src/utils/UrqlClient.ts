import { dedupExchange, fetchExchange, makeOperation } from "urql";
import { authExchange } from "@urql/exchange-auth";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";

const ISSERVER = typeof window === "undefined";

import { stringifyVariables } from "@urql/core";

export type MergeMode = "before" | "after";

export interface PaginationParams {
  cursorArgument?: string;
  limitArgument?: string;
  mergeMode?: MergeMode;
}

export const CursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    console.log(entityKey, fieldName, ">");

    const allFields = cache.inspectFields(entityKey);
    console.log(allFields, ">");
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItinCache = cache.resolve(entityKey, fieldKey);

    info.partial = !isItinCache;
    const results: string[] = [];

    fieldInfos.forEach((fi) => {
      const Recipes = cache.resolve(entityKey, fi.fieldKey) as string[];
      console.log(Recipes);
      results.push(...Recipes);
    });

    return results;
  };
};

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    //credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          allRecipes: CursorPagination(),
        },
      },
    }),
    authExchange({
      addAuthToOperation: ({ authState, operation }) => {
        // the token isn't in the auth state, return the operation without changes
        if (!authState || !authState.token) {
          return operation;
        }

        // fetchOptions can be a function (See Client API) but you can simplify this based on usage
        const fetchOptions =
          typeof operation.context.fetchOptions === "function"
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${authState.token}`,
              credentials: "include",
            },
          },
        });
      },
      willAuthError: ({ authState }) => {
        if (!authState) return true;
        // e.g. check for expiration, existence of auth etc
        return false;
      },
      didAuthError: ({ error }) => {
        // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
        return error.graphQLErrors.some(
          (e) => e.extensions?.code === "FORBIDDEN"
        );
      },
      getAuth: async ({ authState, mutate }) => {
        // for initial launch, fetch the auth state from storage (local storage, async storage etc)
        if (!authState && !ISSERVER) {
          const token = localStorage.getItem("token");
          const refreshToken = localStorage.getItem("refreshToken");
          if (token) {
            return { token };
          }
          return null;
        }
        return null;
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
