import * as eth from 'eth-connect'
import * as dclTx from 'decentraland-transactions'

export type Providers = {
  requestManager: eth.RequestManager
  metaRequestManager: eth.RequestManager
  fromAddress: string
}

export interface IMANAComponents {
  balance: (from?: string) => Promise<string>
  allowance: (spenderAddress: string, from?: string) => Promise<string>
  approve: (spenderAddress: string, amount?: eth.BigNumber) => Promise<string>
  transfer: (to: string, amount: eth.BigNumber) => Promise<string>
  //depositMana: (amount: number) => Promise<string>
}

export function createMANAComponent({
  requestManager,
  metaRequestManager,
  fromAddress,
}: Providers): IMANAComponents {
  async function getContract() {
    const manaConfig = dclTx.getContract(dclTx.ContractName.MANAToken, 137)
    let contract: any = await new eth.ContractFactory(metaRequestManager, manaConfig.abi).at(
      manaConfig.address
    )

    return {
      manaConfig,
      contract,
    }
  }

  async function balance(from?: string) {
    const { manaConfig, contract } = await getContract()
    const res = await contract.balanceOf(from || fromAddress)

    return res
  }

  async function allowance(spenderAddress: string, from?: string) {
    const { manaConfig, contract } = await getContract()
    const res = await contract.allowance(from || fromAddress, spenderAddress)

    return res
  }

  async function approve(spenderAddress: string, amount?: eth.BigNumber) {
    const { manaConfig, contract } = await getContract()

    const functionHex = contract.approve.toPayload(
      spenderAddress,
      amount || '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    )

    const txHash = await dclTx.sendMetaTransaction(
      requestManager as any,
      metaRequestManager as any,
      functionHex.data,
      manaConfig,
      { serverURL: 'https://transactions-api.decentraland.org/v1' }
    )
    return txHash
  }
  async function transfer(to: string, amount: eth.BigNumber) {
    const { manaConfig, contract } = await getContract()

    const functionHex = contract.transferFrom.toPayload(fromAddress, to, amount)

    const txHash = await dclTx.sendMetaTransaction(
      requestManager as any,
      metaRequestManager as any,
      functionHex.data,
      manaConfig,
      { serverURL: 'https://transactions-api.decentraland.org/v1' }
    )
    return txHash
  }
  return { transfer, balance, allowance, approve }
}
