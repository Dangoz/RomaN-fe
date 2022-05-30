import IProfile, { INotes } from '@/types/profile'
import cyberconnect from './cyberconnect'
import rss3 from './rss3'
import Unidata from 'unidata.js'
import config from './config'
import axios from 'axios'

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
  const activitiesPromise = rss3.getNFTActivity(address, 1, unidata)

  const data = await Promise.all([
    profilePromise,
    linksCountPromise,
    assetsPromise,
    footprintsPromise,
    notesPromise,
    activitiesPromise,
  ])

  // get profile
  const profiles = data[0]
  const uniProfile = profiles.list[0]
  const domain = uniProfile?.name || uniProfile?.username || ''
  const bio = uniProfile?.bio || ''

  let avatar = ''
  for (let profile of profiles.list) {
    if (profile.avatars && profile.avatars[0]) {
      avatar = profile.avatars[0]
      break
    }
  }
  if (avatar.slice(0, 6) === 'eip155') {
    let li = avatar.split('/')
    const tokenId = li[2]
    const contractAddress = li[1].split(':')[1]
    avatar = await getNFTUrl(contractAddress, tokenId)
  }
  if (avatar.slice(0, 4) === 'ipfs') {
    const ipfsAddress = avatar.split('ipfs://ipfs/')[1]
    avatar = `https://ipfs.io/ipfs/${ipfsAddress}`
  }
  console.log('AVATARRRR', avatar)

  // get links count
  const { followerCount, followingCount } = data[1]

  // get assets
  const assets = data[2]

  // get footprints
  const footprints = data[3]

  // get notes
  const mirror = data[4]

  // get activities
  const activities = data[5]

  const notes = [...mirror.list, ...activities.list]
  notes.sort((a, b) => {
    return +new Date(a.date_updated) - +new Date(b.date_updated)
  })

  const profile: IProfile = {
    address,
    domain,
    avatar,
    bio,
    followerCount,
    followingCount,
    assets: assets.list,
    footprints: footprints.list,
    notes: notes,
    mirrorCursor: mirror.cursor,
    activityCursor: activities.cursor,
  }
  return profile
}

export default profileGenerator

const getNFTUrl = async (contractAddress: string, tokenId: string): Promise<string> => {
  try {
    const data = (await axios.get(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`)).data
    console.log('DATAATATATATATATAT', data)
    const url = data.image_original_url || data.image_url || ''
    return url
  } catch (err) {
    console.error((err as Error).message)
    return ''
  }
}

export const paginateNotes = async (address: string, mirrorCursor: any, activityCursor: any): Promise<INotes> => {
  // initialize unidata
  const unidata = new Unidata({
    infuraProjectID: config.infuraID,
  })

  const notesPromise = rss3.getNotes(address, 1, unidata, mirrorCursor)
  const activitiesPromise = rss3.getNFTActivity(address, 1, unidata, activityCursor)

  const data = await Promise.all([notesPromise, activitiesPromise])
  const mirror = data[0]
  const activities = data[1]
  const notes = [...mirror.list, ...activities.list]
  notes.sort((a, b) => {
    return +new Date(a.date_updated) - +new Date(b.date_updated)
  })

  return {
    notes,
    mirrorCursor: mirror.cursor,
    activityCursor: activities.cursor,
  }
}
