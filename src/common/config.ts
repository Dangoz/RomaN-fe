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
      assets: 20,
      footprints: 10,
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
}

export default config
