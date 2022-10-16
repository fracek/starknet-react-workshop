import { Box, Heading, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { BlockSection } from "../components/BlockSection";
import { CounterValue } from "../components/CounterValue";

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
        <BlockSection />
        <CounterValue />
      </VStack>
    </>
  );
};

export default Home;
