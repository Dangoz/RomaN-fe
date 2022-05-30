import { Asset, Note, Assets } from './unidata'
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
  mirrorCursor?: any
  activityCursor?: any
}

export interface INotes {
  notes: Note[]
  mirrorCursor?: any
  activityCursor?: any
}
