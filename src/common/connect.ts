/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers, Signer } from 'ethers'
import { getLocalmethod, setLocalmethod } from './localStorage'
import { UserActionPayloads, UserActionTypes, UserActions } from '@/states/user/actions'
import Router from 'next/router'
import config from './config'

const connectMetaMask = async (): Promise<UserActionPayloads['LOG_IN'] | null> => {
  if (!(window as any).ethereum) {
    return null
  }

  const metamaskEthereum = (window as any).ethereum
  const provider = new ethers.providers.Web3Provider(metamaskEthereum)

  try {
    await provider.send('eth_requestAccounts', [])
  } catch (err) {
    console.error((err as Error).message)
    return null
  }

  const accounts = await metamaskEthereum.request({
    method: 'eth_requestAccounts',
  })

  const address = ethers.utils.getAddress(accounts[0])
  return { address, provider }
}

const connectWalletConnect = async (
  userDispatch: React.Dispatch<UserActions>,
): Promise<UserActionPayloads['LOG_IN'] | null> => {
  const walletConnectProvider = new WalletConnectProvider({
    infuraId: config.infuraID,
    pollingInterval: 60 * 1000,
  })

  let session: string[]
  try {
    session = await walletConnectProvider.enable()
  } catch (err) {
    console.error(err)
  }

  const provider = new ethers.providers.Web3Provider(walletConnectProvider)
  if (!provider) {
    return null
  }

  // subscribe to disconnect
  walletConnectProvider.on('disconnect', (code: number, reason: string) => {
    console.log(code, reason)
    disconnect(userDispatch)
  })

  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  return { address, provider }
}

const disconnect = async (userDispatch: React.Dispatch<UserActions>) => {
  // clear localstorage
  setLocalmethod('', '')

  // reset userState to initial state
  userDispatch({
    type: UserActionTypes['logout'],
    payload: {},
  })

  // redirect back to home page upon disconnect
  Router.push('/')
}

const reconnect = async (userDispatch: React.Dispatch<UserActions>) => {
  // retrieve local connect method
  const { method } = getLocalmethod()

  // re-connect with the corresponding method
  if (method === 'MetaMask' || method === 'WalletConnect') {
    const status = await connectWallet(method, userDispatch)
    if (!status) {
      Router.push('/')
    }
  }
}

const connectWallet = async (
  method: 'MetaMask' | 'WalletConnect',
  userDispatch: React.Dispatch<UserActions>,
): Promise<Boolean> => {
  // connect to corresponding wallet
  let loginPayload: UserActionPayloads['LOG_IN'] | null
  if (method === 'MetaMask') {
    loginPayload = await connectMetaMask()
  } else {
    loginPayload = await connectWalletConnect(userDispatch)
  }
  if (!loginPayload) {
    return false // loginPayload not found, connect failed
  }

  // set connection method to localstorage
  setLocalmethod(method, loginPayload.address)

  // update userState with connection payload
  userDispatch({
    type: UserActionTypes.login,
    payload: loginPayload,
  })
  return true // connect success
}

export default {
  connectWallet,
  disconnect,
  reconnect,
}
