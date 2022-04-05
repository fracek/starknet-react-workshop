import { Box, Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { ConnectWallet } from "./ConnectWallet";

export function Header(): JSX.Element {
  return (
    <Flex p={10}>
      <Box>StarkNet React</Box>
      <Spacer />
      <Box>
        <ConnectWallet />
      </Box>
    </Flex>
  );
}
