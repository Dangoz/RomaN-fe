const config = {
  mockAddress: process.env.NEXT_PUBLIC_MOCK_ADDRESS,
  protectedPath: ['/profile', '/converse', '/edit'],
  infuraID: process.env.NEXT_PUBLIC_INFURA_ID,

  rss3: {
    preGodEndpoint: 'https://pregod.rss3.dev/v0.4.0/',
    sources: {
      ens: 'ENS',
      ethereumNFT: 'Ethereum NFT',
      NFTActivity: 'Ethereum NFT Activity',
      mirror: 'Mirror Entry',
    },
    contentLimits: {
      assets: 12,
      footprints: 12,
      feeds: 3, // paginated
    },
  },

  cyberConnect: {
    dataNetworkEndpoint: 'https://api.cybertino.io/connect/',
    namespace: 'RomaN',
    likeAlias: 'RomaNLIKE',
    blockAlias: 'RomaNREPORT',

    // pagination limit for each type of box/connection
    boxLimits: {
      likers: 10,
      likings: 30,
      matches: 20,
      blacklist: 5,
      recommendation: 5,
    },
  },

  preferred: [
    '0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944',
    '0x8ddd03b89116ba89e28ef703fe037ff77451e38e',
    '0x983110309620d911731ac0932219af06091b6744',
    '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    '0xbd358966445e1089e3add528561719452fb78198',
  ],
}

export default config
