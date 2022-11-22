import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { Provider, createClient } from "urql";

const client = createClient({ url: "http://localhost:4000/graphql" });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <ColorModeProvider>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
