import { dedupExchange, fetchExchange, makeOperation } from "urql";
import { authExchange } from "@urql/exchange-auth";
import { cacheExchange } from "@urql/exchange-graphcache";

const ISSERVER = typeof window === "undefined";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    //credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({}),
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
