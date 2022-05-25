import { ethers } from 'ethers'

export default interface IUser {
  address: string
  provider: ethers.providers.Web3Provider | null

  // name?: string
  // bio?: string
  // messages?: string[]
  // behaviorScore?: number

  // profile: string
  // membership: boolean
  // followers: string[]
  // folloing: string[]
}
