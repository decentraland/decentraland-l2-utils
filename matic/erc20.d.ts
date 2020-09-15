import {
  TransactionObject,
  BlockType,
  EstimateGasOptions,
} from "../utils/types";
import * as ethEsm from "eth-connect/esm";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export class ERC20Matic extends ethEsm.Contract {
  constructor(jsonInterface: any[], address?: string, options?: any);

  clone(): ERC20Matic;
  CHILD_CHAIN_ID(): TransactionObject<string>;

  CHILD_CHAIN_ID_BYTES(): TransactionObject<string>;

  ERC712_VERSION(): TransactionObject<string>;

  ROOT_CHAIN_ID(): TransactionObject<string>;

  ROOT_CHAIN_ID_BYTES(): TransactionObject<string>;

  allowance(owner: string, spender: string): TransactionObject<string>;

  approve(
    spender: string,
    amount: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<boolean>;

  balanceOf(account: string): TransactionObject<string>;

  decimals(): TransactionObject<string>;

  decreaseAllowance(
    spender: string,
    subtractedValue: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<boolean>;

  executeMetaTransaction(
    userAddress: string,
    functionSignature: string | number[],
    sigR: string | number[],
    sigS: string | number[],
    sigV: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<string>;

  getNonce(user: string): TransactionObject<string>;

  increaseAllowance(
    spender: string,
    addedValue: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<boolean>;

  name(): TransactionObject<string>;

  symbol(): TransactionObject<string>;

  totalSupply(): TransactionObject<string>;

  transfer(
    recipient: string,
    amount: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<boolean>;

  transferFrom(
    sender: string,
    recipient: string,
    amount: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<boolean>;

  mint(
    amount: number | string,
    options?: EstimateGasOptions
  ): TransactionObject<void>;
}
