import { Box, Flex, Text } from "@chakra-ui/react";
import { useStarknetBlock } from "@starknet-react/core";
import React, { useMemo } from "react";

export function NetworkStatus(): JSX.Element {
  const { data, loading, error } = useStarknetBlock();

  const indicatorColor = useMemo(() => {
    if (data) {
      return "green";
    }
    if (error) {
      return "red";
    }
    return "blue";
  }, [data, error]);

  const indicatorText = useMemo(() => {
    if (data) {
      return data.block_number;
    }
    if (loading) {
      return "Loading";
    }
    if (error) {
      return "Network Error";
    }
    return "";
  }, [data, loading, error]);

  return (
    <Flex
      position="fixed"
      bottom={10}
      right={10}
      borderWidth={1}
      borderRadius={100}
      px={2}
      py={1}
      fontSize={10}
      justifyItems="center"
      alignItems="center"
      boxShadow="md"
    >
      <Box
        w={4}
        h={4}
        borderRadius={100}
        backgroundColor={indicatorColor}
      ></Box>
      <Text ml={2}>{indicatorText}</Text>
    </Flex>
  );
}
