import { Box } from "@chakra-ui/react";
import { useBlock } from "@starknet-react/core";
import { Loader } from "./Loader";

export function BlockSection() {
  const { data, isLoading, error } = useBlock();

  return (
    <Box w="60rem" mx="auto">
      <Loader isLoading={isLoading} error={error} data={data}>
        {(data) => (
          <Box>
            Current Block: {data.block_number} / {data.block_hash}
          </Box>
        )}
      </Loader>
    </Box>
  );
}
