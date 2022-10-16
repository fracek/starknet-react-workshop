import {
  Button,
  Heading,
  HStack,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  useStarknetExecute,
  useTransactionManager,
} from "@starknet-react/core";
import { useMemo, useReducer, useState } from "react";
import { counterAddress } from "../lib/counter";

export function TransactionBuilder() {
  const [state, dispatch] = useReducer(reducer, { transactions: [] });
  const [amount, setAmount] = useState(0);

  const calls = useMemo(() => {
    return state.transactions.map((amount) => ({
      contractAddress: counterAddress,
      entrypoint: "incrementCounter",
      calldata: [amount],
    }));
  }, [state.transactions]);

  const { execute, reset } = useStarknetExecute({
    calls,
  });

  const { addTransaction } = useTransactionManager();

  const handleAmountChange = (_: string, value: number) => {
    setAmount(value);
  };

  const handleSubmit = async () => {
    const response = await execute();
    addTransaction({
      hash: response.transaction_hash,
      metadata: {
        name: `Increment Counter (${state.transactions.length} times)`,
      },
    });
    reset();
  };

  return (
    <VStack>
      <Heading fontSize="xl">Increment Counter</Heading>
      <VStack>
        {state.transactions.map((amount, index) => (
          <HStack key={index}>
            <Text>Increment by {amount}</Text>
            <Button onClick={() => dispatch({ type: "remove", index })}>
              Remove
            </Button>
          </HStack>
        ))}
      </VStack>
      <HStack>
        <NumberInput value={amount} onChange={handleAmountChange}>
          <NumberInputField />
        </NumberInput>
        <Button onClick={() => dispatch({ type: "add", amount })}>
          Add Tx
        </Button>
      </HStack>
      <Button onClick={handleSubmit}>Submit</Button>
    </VStack>
  );
}

interface State {
  transactions: number[];
}

interface Add {
  type: "add";
  amount: number;
}

interface Remove {
  type: "remove";
  index: number;
}

type Action = Add | Remove;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      return {
        transactions: [...state.transactions, action.amount],
      };
    }
    case "remove": {
      const transactions = state.transactions.filter(
        (_, index) => index !== action.index
      );
      return {
        transactions,
      };
    }
    default:
      return state;
  }
}
