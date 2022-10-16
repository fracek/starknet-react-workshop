import { Box, Heading, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { BlockSection } from "../components/BlockSection";
import { ConnectWallet } from "../components/ConnectWallet";
import { CounterValue } from "../components/CounterValue";
import { TransactionBuilder } from "../components/TransactionBuilder";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>StarkNet React Workshop</title>
      </Head>
      <VStack w="full">
        <Box w="60rem" mx="auto">
          <Heading>StarkNet React Workshop</Heading>
        </Box>
        <ConnectWallet />
        <BlockSection />
        <CounterValue />
        <TransactionBuilder />
      </VStack>
    </>
  );
};

export default Home;
