import { Box } from "@chakra-ui/react";
import { useContract, useStarknetCall } from "@starknet-react/core";
import { Abi } from "starknet";
import { counterAbi, counterAddress } from "../lib/counter";
import { Loader } from "./Loader";

export function CounterValue() {
  const { contract } = useContract({
    abi: counterAbi as Abi,
    address: counterAddress,
  });

  const { data, loading, error } = useStarknetCall({
    contract,
    method: "counter",
    args: [],
  });

  return (
    <Loader isLoading={loading} error={error} data={data}>
      {(data) => <Box>Counter Value: {data[0].toString()}</Box>}
    </Loader>
  );
}
