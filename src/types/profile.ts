import { Assets, Notes } from './unidata'
/**
 * Schema for generated profiles
 */
export default interface IProfile {
  address: string
  domain: string
  avatar: string
  bio: string
  follower: string
  followings: string
  assets: Assets
  footprints: Assets
  notes: Notes
}
