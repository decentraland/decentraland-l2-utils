interface EstimateGasOptions {
  from?: string
  gas?: number
  value?: number | string
}

interface EventOptions {
  filter?: object
  fromBlock?: BlockType
  topics?: string[]
}

export type Callback<T> = (error: Error, result: T) => void
export interface TransactionObject<T> {
  arguments: any[]
  call(options?: EstimateGasOptions): Promise<T>
  send(options?: EstimateGasOptions): Promise<T>
  estimateGas(options?: EstimateGasOptions): Promise<number>
  encodeABI(): string
}
export interface ContractEventLog<T> {
  returnValues: T
}
export interface ContractEventEmitter<T> {
  on(event: 'connected', listener: (subscriptionId: string) => void): this
  on(
    event: 'data' | 'changed',
    listener: (event: ContractEventLog<T>) => void
  ): this
  on(event: 'error', listener: (error: Error) => void): this
}
export type ContractEvent<T> = (
  options?: EventOptions,
  cb?: Callback<ContractEventLog<T>>
) => ContractEventEmitter<T>

export interface Tx {
  nonce?: string | number
  chainId?: string | number
  from?: string
  to?: string
  data?: string
  value?: string | number
  gas?: string | number
  gasPrice?: string | number
}

export interface TransactionObject<T> {
  arguments: any[]
  call(tx?: Tx): Promise<T>
  send(tx?: Tx): Promise<T>
  estimateGas(tx?: Tx): Promise<number>
  encodeABI(): string
}

export type BlockType = 'latest' | 'pending' | 'genesis' | number
