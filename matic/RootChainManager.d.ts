import { TransactionObject, BlockType, EstimateGasOptions } from '../utils/types'
import * as ethEsm from 'eth-connect/esm'

interface EventOptions {
  filter?: object
  fromBlock?: BlockType
  topics?: string[]
}

export class RootChainManager extends ethEsm.Contract {
  constructor(jsonInterface: any[], address?: string, options?: any)
  clone(): RootChainManager
  DEFAULT_ADMIN_ROLE(): TransactionObject<string>

  DEPOSIT(): TransactionObject<string>

  ETHER_ADDRESS(): TransactionObject<string>

  MAPPER_ROLE(): TransactionObject<string>

  MAP_TOKEN(): TransactionObject<string>

  childChainManagerAddress(): TransactionObject<string>

  childToRootToken(arg0: string): TransactionObject<string>

  getRoleAdmin(role: string | number[]): TransactionObject<string>

  getRoleMember(role: string | number[], index: number | string): TransactionObject<string>

  getRoleMemberCount(role: string | number[]): TransactionObject<string>

  grantRole(role: string | number[], account: string, options?: EstimateGasOptions): Promise<string>

  hasRole(role: string | number[], account: string): TransactionObject<boolean>

  processedExits(arg0: string | number[]): TransactionObject<boolean>

  renounceRole(
    role: string | number[],
    account: string,
    options?: EstimateGasOptions
  ): Promise<string>

  revokeRole(
    role: string | number[],
    account: string,
    options?: EstimateGasOptions
  ): Promise<string>

  rootToChildToken(arg0: string): TransactionObject<string>

  tokenToType(arg0: string): TransactionObject<string>

  typeToPredicate(arg0: string | number[]): TransactionObject<string>

  initialize(_owner: string, options?: EstimateGasOptions): Promise<string>

  setStateSender(newStateSender: string, options?: EstimateGasOptions): Promise<string>

  stateSenderAddress(): TransactionObject<string>

  setCheckpointManager(newCheckpointManager: string, options?: EstimateGasOptions): Promise<string>

  checkpointManagerAddress(): TransactionObject<string>

  setChildChainManagerAddress(
    newChildChainManager: string,
    options?: EstimateGasOptions
  ): Promise<string>

  registerPredicate(
    tokenType: string | number[],
    predicateAddress: string,
    options?: EstimateGasOptions
  ): Promise<string>

  mapToken(
    rootToken: string,
    childToken: string,
    tokenType: string | number[],
    options?: EstimateGasOptions
  ): Promise<string>

  depositEtherFor(user: string, options?: EstimateGasOptions): Promise<string>

  depositFor(
    user: string,
    rootToken: string,
    depositData: string | number[],
    options?: EstimateGasOptions
  ): Promise<string>

  exit(inputData: string | number[], options?: EstimateGasOptions): Promise<string>
}
