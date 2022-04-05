import React from "react";
import {
  useStarknet,
  InjectedConnector,
  useStarknetTransactionManager,
  Transaction,
} from "@starknet-react/core";
import {
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, RepeatIcon } from "@chakra-ui/icons";

function shortenHash(hash: string): string {
  if (hash.length <= 8) {
    return hash;
  }
  return `${hash.slice(0, 6)}..${hash.slice(-4)}`;
}

function transactionIcon(transaction: Transaction) {
  switch (transaction.status) {
    case "ACCEPTED_ON_L1":
    case "ACCEPTED_ON_L2":
      return <CheckIcon />;
    case "REJECTED":
      return <CloseIcon />;
    default:
      return <RepeatIcon />;
  }
}

export function ConnectWallet() {
  const { account, connect } = useStarknet();
  const { transactions } = useStarknetTransactionManager();

  if (account) {
    return (
      <Menu>
        <MenuButton as={Button}>{shortenHash(account)}</MenuButton>
        <MenuList>
          <MenuGroup title="Your transactions">
            {transactions.length == 0 && (
              <MenuItem isDisabled>You have no transactions yet</MenuItem>
            )}
            {transactions.map((transaction, index) => (
              <MenuItem key={index} icon={transactionIcon(transaction)}>
                {shortenHash(transaction.transactionHash)}
              </MenuItem>
            ))}
          </MenuGroup>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Button variant="solid" onClick={() => connect(new InjectedConnector())}>
      Connect Wallet
    </Button>
  );
}
