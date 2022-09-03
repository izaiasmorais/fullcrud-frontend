import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { fetch } from "cross-fetch";

export const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.APOLLO_URL as string, fetch }),
  cache: new InMemoryCache(),
});
