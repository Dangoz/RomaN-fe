import { Asset, Note } from './unidata'
/**
 * Schema for generated profiles
 */
export default interface IProfile {
  address: string
  domain: string
  avatar: string
  bio: string
  followerCount: number
  followingCount: number
  assets: Asset[]
  footprints: Asset[]
  notes: Note[]
}
