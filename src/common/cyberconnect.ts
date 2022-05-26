// functions for querying CyberConnect API

import { createClient, Client } from 'urql'
import config from './config'

const cyberConnectClient: Client = createClient({
  url: config.cyberConnect.dataNetworkEndpoint,

  fetchOptions: () => {
    return {}
  },
})

// retrieve people who LIKE the passed address within RomaN namespace; similar to getFollowers
const getLikers = async (address: string) => {
  const likersQuery = ``
  const { data, error } = await cyberConnectClient.query(likersQuery).toPromise()
  if (error != null) {
    return alert(error)
  }
}

// retrieve people whom the address LIKE within RomaN namespace; similar to getFollowings
const getLikings = (address: string) => {}

//
const getBlackList = (address: string) => {}
