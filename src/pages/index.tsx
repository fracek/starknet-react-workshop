import { Box, Center } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Header } from "~/components/Header";
import { TokenView } from "~/components/TokenView";

const Home: NextPage = () => {
  return (
    <Box>
      <Header />
      <Center>
        <TokenView />
      </Center>
    </Box>
  );
};

export default Home;
