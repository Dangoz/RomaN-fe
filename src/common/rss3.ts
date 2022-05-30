/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import config from './config'
import Unidata from 'unidata.js'
import { Assets, Profiles, Notes } from '@/types/unidata'

export default {
  getAssets: async (address: string, unidata: Unidata): Promise<Assets> => {
    try {
      const assets: Assets = await unidata.assets.get({
        source: config.rss3.sources.ethereumNFT,
        identity: address,
        limit: config.rss3.contentLimits.assets,
      })
      return assets
    } catch (err) {
      console.error((err as Error).message)
      return { total: 0, list: [] }
    }
  },

  getFootprints: async (address: string, unidata: Unidata): Promise<Assets> => {
    try {
      // const footprints: Assets = await axios.get(`${config.rss3.preGodEndpoint}account:${address}@ethereum/notes?tags=POAP`)
      const footprints: Assets = await unidata.assets.get({
        source: config.rss3.sources.ethereumNFT,
        identity: address,
        providers: ['POAP'],
        limit: config.rss3.contentLimits.footprints,
      })
      return footprints
    } catch (err) {
      console.error((err as Error).message)
      return { total: 0, list: [] }
    }
  },

  getNotes: async (address: string, page: number, unidata: Unidata, cursor?: any): Promise<Notes> => {
    try {
      const notes: Notes = await unidata.notes.get({
        source: config.rss3.sources.mirror,
        identity: address,
        limit: config.rss3.contentLimits.feeds,
        cursor,
      })
      return notes
    } catch (err) {
      console.error((err as Error).message)
      return { total: 0, list: [] }
    }
  },

  getNFTActivity: async (address: string, page: number, unidata: Unidata, cursor?: any): Promise<Notes> => {
    try {
      const notes: Notes = await unidata.notes.get({
        source: config.rss3.sources.NFTActivity,
        identity: address,
        limit: config.rss3.contentLimits.feeds,
        cursor,
      })
      return notes
    } catch (err) {
      console.error((err as Error).message)
      return { total: 0, list: [] }
    }
  },

  getProfile: async (address: string, unidata: Unidata): Promise<Profiles> => {
    try {
      const profiles: Profiles = await unidata.profiles.get({
        source: config.rss3.sources.ens,
        identity: address,
      })
      return profiles
    } catch (err) {
      console.error((err as Error).message)
      return { total: 0, list: [] }
    }
  },
}
