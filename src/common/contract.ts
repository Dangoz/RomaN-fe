import { ethers } from 'ethers'

// functions for accessing contract
// const createInstance = async (): Promise<ethers.utils.Interface> => {
//   const abi = new ethers.utils.Interface({ abc: 'abc' })
//   return abi
// }

const mintToken = async (
  address: string,
  abi: ethers.utils.Interface,
  provider: ethers.providers.JsonRpcSigner,
): Promise<ethers.Contract> => {
  const contractMint = new ethers.Contract(address, abi, provider)
  return contractMint
}

export {}
