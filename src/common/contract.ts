import { ethers } from 'ethers'
import valultContractAbi from '../../polygon-contracts/RomanVault.json'
import tokenContractAbi from '../../polygon-contracts/RomanToken.json'
import userContractAbi from '../../polygon-contracts/RomanUser.json'
import config from './config'

export const tokenContract = async (signer: ethers.providers.JsonRpcSigner): Promise<ethers.Contract> => {
  const abi = new ethers.utils.Interface(tokenContractAbi.abi)
  const contract = new ethers.Contract(config.contracts.romanToken, abi, signer)
  return contract
}

export const userContract = async (signer: ethers.providers.JsonRpcSigner): Promise<ethers.Contract> => {
  const abi = new ethers.utils.Interface(userContractAbi.abi)
  const contract = new ethers.Contract(config.contracts.romanUser, abi, signer)
  return contract
}

export const vaultContract = async (signer: ethers.providers.JsonRpcSigner): Promise<ethers.Contract> => {
  const abi = new ethers.utils.Interface(valultContractAbi.abi)
  const contract = new ethers.Contract(config.contracts.romanVault, abi, signer)
  return contract
}
