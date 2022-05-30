import React, { useEffect, useState, useRef, Dispatch, useCallback } from 'react'
import profileGenerator from '@/common/profile'
import Spinner from '@/components/ui/Spinner'
import IProfile from '@/types/profile'
import Asset from './Asset'
import Note from './Note'
import { Asset as AssetType, Note as NoteType } from '@/types/unidata'
import { paginateNotes } from '@/common/profile'

interface ProfileProps {
  address: string
  width: number
  height: number
}

const Profile = ({ width, height, address }: ProfileProps) => {
  const scrollRef = useRef<HTMLDivElement | null>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAssetsLoading, setIsAssetsLoading] = useState<boolean>(false)
  const [isNotesLoading, setIsNotesLoading] = useState<boolean>(false)
  const [profile, setProfile] = useState<IProfile | null>(null)
  const [assets, setAssets] = useState<AssetType[]>([])

  const handleNotesPaginate = useCallback(async () => {
    if (!profile) {
      return
    }
    setIsNotesLoading(true)
    const data = await paginateNotes(address, profile.mirrorCursor, profile.activityCursor)
    setProfile({
      ...profile,
      mirrorCursor: data.mirrorCursor,
      activityCursor: data.activityCursor,
      notes: [...profile.notes, ...data.notes],
    })
    setIsNotesLoading(false)
  }, [address, profile])

  const handleAssetsPaginate = async () => {
    if (!profile) {
      return
    }
    setIsAssetsLoading(true)
    const newAssets = profile.assets
      .filter((asset) => {
        return (
          (asset.items && asset.items[0].address?.match(/\.(jpeg|jpg|gif|png)$/)) ||
          (asset.previews && asset.previews[0].address?.match(/\.(jpeg|jpg|gif|png)$/))
        )
      })
      .slice(0, assets.length + 9)
    setAssets(newAssets)
    setIsAssetsLoading(false)
  }

  useEffect(() => {
    if (!address) {
      return
    }
    const getProfile = async () => {
      setIsLoading(true)
      const profile = await profileGenerator(address)
      setProfile(profile)
      setIsLoading(false)
    }
    getProfile()
  }, [address])

  useEffect(() => {
    if (!profile) {
      return
    }
    const assets = profile.assets
      .filter((asset) => {
        return (
          (asset.items && asset.items[0].address?.match(/\.(jpeg|jpg|gif|png)$/)) ||
          (asset.previews && asset.previews[0].address?.match(/\.(jpeg|jpg|gif|png)$/))
        )
      })
      .slice(0, 9)
    setAssets(assets)
  }, [profile])

  return (
    <>
      <div
        style={{ height: `${height}px`, width: `${width}px` }}
        className="overflow-hidden flex flex-col justify-center items-center border-2 border-purple-700 rounded"
      >
        {isLoading || !profile ? (
          <Spinner />
        ) : (
          <div ref={(e) => (scrollRef.current = e)} className=" overflow-y-scroll h-full w-full">
            {/* avatar */}
            <div className="my-1 w-full flex justify-center">
              <img
                className="h-[100px] w-[100px] rounded-[99px]"
                src={profile?.avatar ? profile.avatar : '/ethShanghai.png'}
                alt="avatar"
              />
            </div>

            {/* domain, address */}
            <div className="w-full flex justify-center flex-col items-center">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-3xl">
                {profile.domain}
              </div>
              <div className="text-ellipsis overflow-hidden w-[190px] hover:w-full text-center">{profile.address}</div>
            </div>

            {/* bio */}
            <div className="w-full flex justify-center mt-1">
              <div className="text-ellipsis overflow-hidden break-words w-[360px] max-h-[50px] text-center">
                {profile.bio}
              </div>
            </div>

            {/* followerCount, followingCount */}
            <div className="w-full flex justify-evenly mt-2">
              <div className="text-center">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-4xl">
                  {profile.followerCount}
                </div>
                Followers
              </div>

              <div className="text-center">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-4xl">
                  {profile.followingCount}
                </div>
                Followings
              </div>
            </div>

            {/* assets */}
            <div className="text-center mt-5">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-4xl">
                {assets.length ? 'Assets' : ''}
              </div>
              <div className="grid grid-cols-3">
                {assets.map((asset, index) => (
                  <Asset asset={asset} key={index} />
                ))}
              </div>

              {isNotesLoading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
                <button
                  className="bg-gradient-to-r from-purple-400 to-pink-600 h-[30px] w-[90px] rounded my-1 mb-3 text-white"
                  onClick={handleAssetsPaginate}
                >
                  Load More
                </button>
              )}
            </div>

            {/* footprints */}

            {/* notes */}
            <div className="text-center mt-5">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-4xl">
                {profile.notes.length ? 'Notes' : ''}
              </div>

              <div className="flex flex-col w-full">
                {profile.notes.map((note, index) => (
                  <Note note={note} key={index} />
                ))}
              </div>

              {!profile.notes.length ? (
                ''
              ) : isNotesLoading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
                <button
                  className="bg-gradient-to-r from-purple-400 to-pink-600 h-[30px] w-[90px] rounded my-1 mb-3 text-white"
                  onClick={handleNotesPaginate}
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Profile
