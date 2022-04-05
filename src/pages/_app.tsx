import type { AppProps } from "next/app";
import NextHead from "next/head";
import { StarknetProvider } from "@starknet-react/core";
import { ChakraProvider } from "@chakra-ui/react";
import { NetworkStatus } from "~/components/NetworkStatus";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <StarknetProvider>
        <NextHead>
          <title>StarkNet React Workshop</title>
        </NextHead>
        <Component {...pageProps} />
        <NetworkStatus />
      </StarknetProvider>
    </ChakraProvider>
  );
}

export default MyApp;
