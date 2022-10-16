export const counterAddress =
  "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1";

export const counterAbi = [
  {
    inputs: [
      {
        name: "amount",
        type: "felt",
      },
    ],
    name: "incrementCounter",
    outputs: [
      {
        name: "prev_count",
        type: "felt",
      },
      {
        name: "new_count",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [],
    name: "counter",
    outputs: [
      {
        name: "count",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastCaller",
    outputs: [
      {
        name: "address",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
