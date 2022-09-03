import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { theme } from "../styles/theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Head>
            <title>Fullcrud</title>
          </Head>
          <Component {...pageProps} />
          <Toaster position="top-center" reverseOrder={false} />
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
