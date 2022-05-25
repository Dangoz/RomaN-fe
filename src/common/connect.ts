/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers, Signer } from 'ethers'
import { getLocalmethod, setLocalmethod } from './util'
import { UserActionPayloads, UserActionTypes, UserActions } from '@/states/user/actions'

const connectMetaMask = async (): Promise<UserActionPayloads['LOG_IN'] | null> => {
  if (!(window as any).ethereum) {
    return null
  }

  const metamaskEthereum = (window as any).ethereum
  const provider = new ethers.providers.Web3Provider(metamaskEthereum)
  await provider.send('eth_requestAccounts', [])
  const accounts = await metamaskEthereum.request({
    method: 'eth_requestAccounts',
  })

  const address = ethers.utils.getAddress(accounts[0])
  const signer: Signer = await provider.getSigner()
  return { address, provider }
}

const connectWalletConnect = async (): Promise<UserActionPayloads['LOG_IN'] | null> => {
  const walletConnectProvider = new WalletConnectProvider({
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
  })

  let session: string[]
  try {
    session = await walletConnectProvider.enable()
  } catch (err) {
    console.error(err)
  }

  const provider = new ethers.providers.Web3Provider(walletConnectProvider)

  walletConnectProvider.on('disconnect', (code: number, reason: string) => {
    console.log(code, reason)
  })

  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  return { address, provider }
}

const disconnect = async () => {}

const reconnect = async () => {}

export default {
  connectWallet: async (method: 'MetaMask' | 'WalletConenct', userDispatch: React.Dispatch<UserActions>) => {
    // connect to corresponding wallet
    let loginPayload: UserActionPayloads['LOG_IN'] | null
    if (method === 'MetaMask') {
      loginPayload = await connectMetaMask()
    } else {
      loginPayload = await connectWalletConnect()
    }

    if (!loginPayload) {
      return
    }

    // set connection method to localstorage
    setLocalmethod(method, loginPayload.address)

    // update userStore with connection payload
    userDispatch({
      type: UserActionTypes.login,
      payload: loginPayload,
    })
  },
  disconnect,
  reconnect,
}
