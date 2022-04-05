import {
  Box,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import {
  useStarknet,
  useStarknetCall,
  useStarknetInvoke,
} from "@starknet-react/core";
import React, { useCallback, useMemo, useState } from "react";
import { toBN } from "starknet/dist/utils/number";
import { bnToUint256, uint256ToBN } from "starknet/dist/utils/uint256";
import { useTokenContract } from "~/hooks/token";

function TokenBalance({ account }: { account?: string }) {
  const { contract } = useTokenContract();
  const { data, loading, error } = useStarknetCall({
    contract,
    method: "balanceOf",
    args: account ? [account] : undefined,
  });

  const balance = useMemo(() => {
    if (data && data.length > 0) {
      return uint256ToBN(data[0]).toString();
    }
  }, [data]);

  if (balance !== undefined) {
    return <Text>Your balance: {balance}</Text>;
  }

  if (loading) {
    return <Text>Loading balance...</Text>;
  }

  if (error) {
    return <Text>Could not load balance: {error}</Text>;
  }

  return <Text></Text>;
}

function TransferToken({ account }: { account?: string }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState<string | undefined>();

  const { contract } = useTokenContract();
  const { loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: "transfer",
  });

  const updateAmount = useCallback(
    (newAmount: string) => {
      // soft-validate amount
      setAmount(newAmount);
      try {
        toBN(newAmount);
        setAmountError(undefined);
      } catch (err) {
        setAmountError("Please input a valid number");
      }
    },
    [setAmount]
  );

  const onTransfer = useCallback(() => {
    reset();
    if (account && !amountError && recipient) {
      const amountBn = bnToUint256(amount);
      invoke({ args: [recipient, amountBn] });
    }
  }, [account, amount, amountError, recipient, invoke, reset]);

  return (
    <Box>
      <Box my={4}>
        <Text>Recipient</Text>
        <Input onChange={(evt) => setRecipient(evt.target.value)} />
      </Box>
      <Box my={4}>
        <Text>Amount</Text>
        <NumberInput>
          <NumberInputField
            onChange={(evt) => updateAmount(evt.target.value)}
          />
        </NumberInput>
        {amountError && <Text color="red">{amountError}</Text>}
      </Box>
      <Button my={4} onClick={onTransfer} disabled={loading}>
        Transfer
      </Button>
      {error && <Text color="red">{error}</Text>}
    </Box>
  );
}

export function TokenView(): JSX.Element {
  const { account } = useStarknet();

  return (
    <Box borderWidth={1} p={10} borderRadius={10} w="25%">
      {account ? (
        <Box>
          <TokenBalance account={account} />
          <TransferToken account={account} />
        </Box>
      ) : (
        <Text>Connect wallet to begin</Text>
      )}
    </Box>
  );
}
