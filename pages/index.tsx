import { Box, Heading, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

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
      </VStack>
    </>
  );
};

export default Home;
