import IProfile from '@/types/profile'
import cyberconnect from './cyberconnect'
import rss3 from './rss3'
import Unidata from 'unidata.js'
import config from './config'

/**
 * Given an address, generate user profile data with domain name, avatar,
 * links, assets/nfts, footprints/poap, notes/content.
 */
const profileGenerator = async (address: string): Promise<IProfile> => {
  // initialize unidata
  const unidata = new Unidata({
    infuraProjectID: config.infuraID,
  })

  const profilePromise = rss3.getProfile(address, unidata)
  const linksCountPromise = cyberconnect.getLinksCount(address)
  const assetsPromise = rss3.getAssets(address, unidata)
  const footprintsPromise = rss3.getFootprints(address, unidata)
  const notesPromise = rss3.getNotes(address, 1, unidata)

  const data = await Promise.all([profilePromise, linksCountPromise, assetsPromise, footprintsPromise, notesPromise])

  // get profile
  const profiles = data[0]
  const uniProfile = profiles.list[0]
  const domain = uniProfile?.name || uniProfile?.username || ''
  const avatar = uniProfile?.avatars ? uniProfile.avatars[0] : ''
  const bio = uniProfile?.bio || ''

  // get links count
  const { followerCount, followingCount } = data[1]

  // get assets
  const assets = data[2]

  // get footprints
  const footprints = data[3]

  // get notes
  const notes = data[4]

  const profile: IProfile = {
    address,
    domain,
    avatar,
    bio,
    followerCount,
    followingCount,
    assets: assets.list,
    footprints: footprints.list,
    notes: notes.list,
  }
  return profile
}

export default profileGenerator
