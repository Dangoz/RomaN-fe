import CyberConnect, { ConnectionType, Env, Blockchain } from '@cyberlab/cyberconnect'
import { ethers } from 'ethers'
import config from '@/common/config'

const useCyberConnect = (provider: ethers.providers.Web3Provider) => {
  const cyberconnect = new CyberConnect({
    namespace: 'RomaN',
    env: Env.PRODUCTION,
    chain: Blockchain.ETH,
    provider: provider,
    signingMessageEntity: 'CyberConnect' || 'RomaN',
  })

  const like = async (targetAddress: string) => {
    try {
      await cyberconnect.connect(targetAddress, config.cyberConnect.likeAlias, ConnectionType.LIKE)
    } catch (err) {
      console.error(err)
    }
  }

  const block = async (targetAddress: string) => {
    try {
      await cyberconnect.connect(targetAddress, config.cyberConnect.blockAlias, ConnectionType.REPORT)
    } catch (err) {
      console.error(err)
    }
  }

  // disconnect any relationship with targetAddress, such as LIKE, REPORT
  const unfollow = async (targetAddress: string) => {
    try {
      await cyberconnect.disconnect(targetAddress)
    } catch (err) {
      console.error(err)
    }
  }

  return { like, block, unfollow }
}

export default useCyberConnect
