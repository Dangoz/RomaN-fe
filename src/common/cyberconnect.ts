/* eslint-disable import/no-anonymous-default-export */

import { createClient, Client } from '@urql/core'
import { IConnection, IRecommendation } from '@/types/connection'
import { ConnectionType } from '@cyberlab/cyberconnect'
import config from './config'

const cyberConnectClient: Client = createClient({
  url: config.cyberConnect.dataNetworkEndpoint,

  fetchOptions: () => {
    return {}
  },
})

// functions for querying CyberConnect API
export default {
  // retrieve people who LIKE the passed address within RomaN namespace; similar to getFollowers
  getLikers: async (address: string, limit: number, page: number): Promise<IConnection[]> => {
    const likersQuery = `query FullIdentityQuery(
      $address: String! = "0x148d59faf10b52063071eddf4aaf63a395f2d41c"
      $namespace: String = "CyberConnect"
      $type: ConnectionType = FOLLOW
      $first: Int = 10
      $after: String = "-1"
    ) {
      identity(address: $address) {
        followerCount(namespace: $namespace, type: $type)
        followers(
          namespace: $namespace
          type: $type
          first: $first
          after: $after
        ) {
          list {
            address
            domain
            avatar
            alias
          }
        }
      }
    }`
    const variables = {
      address,
      namespace: config.cyberConnect.namespace,
      type: ConnectionType.LIKE,
      first: limit,
      after: `${limit * (page - 1) - 1}`,
    }
    const { data, error } = await cyberConnectClient.query(likersQuery, variables).toPromise()
    if (error != null) {
      console.error('getLikers:', error.message)
      return []
    }

    const likers = <IConnection[]>data.identity.followers.list
    return likers
  },

  // retrieve people whom the address LIKE within RomaN namespace; similar to getFollowings
  getLikings: async (address: string, limit: number, page: number): Promise<IConnection[]> => {
    const likingsQuery = `query FullIdentityQuery(
      $address: String! = "0x148d59faf10b52063071eddf4aaf63a395f2d41c"
      $namespace: String = "CyberConnect"
      $type: ConnectionType = FOLLOW
      $first: Int = 10
      $after: String = "-1"
    ) {
      identity(address: $address) {
        followingCount(namespace: $namespace, type: $type)
        followings(
          namespace: $namespace
          type: $type
          first: $first
          after: $after
        ) {
          list {
            address
            domain
            avatar
            alias
          }
        }
      }
    }`
    const variables = {
      address,
      namespace: config.cyberConnect.namespace,
      type: ConnectionType.LIKE,
      // namespace: "CyberConnect",
      // type: ConnectionType.FOLLOW,
      first: limit,
      after: `${limit * (page - 1) - 1}`,
    }
    const { data, error } = await cyberConnectClient.query(likingsQuery, variables).toPromise()
    if (error != null) {
      console.error('getLikings:', error.message)
      return []
    }

    const likings = <IConnection[]>data.identity.followings.list
    return likings
  },

  // retrieve people who both like and liked by the passed in address
  getMatches: async (address: string, limit: number, page: number): Promise<IConnection[]> => {
    const matchesQuery = `query FullIdentityQuery(
      $address: String! = "0x148d59faf10b52063071eddf4aaf63a395f2d41c"
      $namespace: String = "CyberConnect"
      $type: ConnectionType = FOLLOW
      $first: Int = 10
      $after: String = "-1"
    ) {
      identity(address: $address) {
        friends(namespace: $namespace, type: $type, first: $first, after: $after) {
          list {
            address
            domain
            avatar
            alias
          }
        }
      }
    }`
    const variables = {
      address,
      namespace: config.cyberConnect.namespace,
      type: ConnectionType.LIKE,
      first: limit,
      after: `${limit * (page - 1) - 1}`,
    }
    const { data, error } = await cyberConnectClient.query(matchesQuery, variables).toPromise()
    if (error != null) {
      console.error('getMatches:', error.message)
      return []
    }

    const matches = <IConnection[]>data.identity.friends.list
    return matches
  },

  // retrieve people who are blocked by the passed in address
  getBlackList: async (address: string, limit: number, page: number): Promise<IConnection[]> => {
    const blacklistQuery = `query FullIdentityQuery(
      $address: String! = "0x148d59faf10b52063071eddf4aaf63a395f2d41c"
      $namespace: String = "CyberConnect"
      $type: ConnectionType = FOLLOW
      $first: Int = 10
      $after: String = "-1"
    ) {
      identity(address: $address) {
        followingCount(namespace: $namespace, type: $type)
        followings(
          namespace: $namespace
          type: $type
          first: $first
          after: $after
        ) {
          list {
            address
            domain
            avatar
            alias
          }
        }
      }
    }`
    const variables = {
      address,
      namespace: config.cyberConnect.namespace,
      type: ConnectionType.REPORT,
      first: limit,
      after: `${limit * (page - 1) - 1}`,
    }
    const { data, error } = await cyberConnectClient.query(blacklistQuery, variables).toPromise()
    if (error != null) {
      console.error('getBlackList:', error.message)
      return []
    }

    const blacklist = <IConnection[]>data.identity.followings.list
    return blacklist
  },

  // retrieve recommendations for the passed in address
  getRecommendation: async (address: string, limit: number, page: number): Promise<IRecommendation[]> => {
    const recommendationQuery = `query QueryRecommendation(
      $address: String! = "0x6bEe0dCF9C1effC2A2B4de91F896ff663D99c5BD"
      $namespace: String = "CyberConnect"
      $first: Int = 10
      $after: String = "-1"
    ) {
      recommendations(
        address: $address
        filter: SOCIAL
        network: ETH
        namespace: $namespace
        first: $first
        after: $after
      ) {
        result
        data {
          list {
            address
            domain
            avatar
            recommendationReason
          }
        }
      }
    }`
    const variables = {
      address,
      namespace: '',
      first: limit,
      after: `${limit * (page - 1) - 1}`,
    }
    const { data, error } = await cyberConnectClient.query(recommendationQuery, variables).toPromise()
    if (error != null || data.recommendations.result !== 'SUCCESS') {
      console.error('getRecommendation', error?.message)
      return []
    }

    const recommendations = <IRecommendation[]>data.recommendations.data.list
    return recommendations
  },
}
