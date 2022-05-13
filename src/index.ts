import { getUserAccount } from '@decentraland/EthereumController'
import { getProvider } from '@decentraland/web3-provider'
import * as eth from 'eth-connect'
import { createMANAComponent } from './mana'

export async function createComponents() {
    const provider = await getProvider()
    const requestManager: any = new eth.RequestManager(provider)
    const metaProvider: any = new eth.HTTPProvider('https://polygon-rpc.com')
    const fromAddress = await getUserAccount()
    const metaRequestManager: any = new eth.RequestManager(metaProvider)
    const providers = {
      requestManager,
      metaProvider,
      metaRequestManager,
      fromAddress,
    }

    const mana = await createMANAComponent(providers)

    return { mana } 
}
