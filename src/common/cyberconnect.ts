import CyberConnect, { Env, Blockchain } from '@cyberlab/cyberconnect'

const cyberConnectClient = new CyberConnect({
  namespace: 'RomaN',
  env: Env.PRODUCTION,
  chain: Blockchain.ETH,
  provider: null,
  signingMessageEntity: 'CyberConnect' || 'RomaN',
})

export default cyberConnectClient

// functions for querying CyberConnect API
export {}
