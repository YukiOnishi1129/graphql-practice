/**
 * _app.tsx
 * @package pages
 */

import React from "react";
import { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const cache = new InMemoryCache();
const client = new ApolloClient({
  //   uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  uri: `http://localhost:4000/graphql`,
  cache,
});

/**
 * MyApp
 * @param {AppProps} param0
 * @returns
 */
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
