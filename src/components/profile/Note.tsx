import React, { useEffect, useState } from 'react'
import { Note } from '@/types/unidata'
import { LinkIcon } from '@heroicons/react/solid'

const Note = ({ note }: { note: Note }) => {
  const [created, setCreated] = useState<string>('')
  const [updated, setUpdated] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('')

  useEffect(() => {
    const createSplit = new Date(note.date_created).toString().split(' ')
    const updatedSplit = new Date(note.date_updated).toString().split(' ')
    const created = createSplit.slice(0, 4).join(' ')
    const updated = updatedSplit.slice(0, 4).join(' ')
    setCreated(created)
    setUpdated(updated)

    setImgSrc(note.attachments && note.attachments[0]?.address ? note.attachments[0].address : '')
  }, [note])

  return (
    <>
      <div className="w-full pl-2 my-2 max-h-[180px] border-b-2 border-purple-300 pb-2">
        {/* title */}
        <div className="h-[30px] font-bold flex justify-start overflow-hidden text-ellipsis text-base">
          {note.title}
        </div>

        {/* dates & link */}
        <div className="text-xs flex justify-start items-center">
          <div className="font-bold text-xs mr-1">Created:</div>
          {created}
          <div className="font-bold text-xs mx-1">Updated:</div>
          {updated}
          {note.related_urls?.map((url, index) => (
            <a href={url} key={index} target="_blank" rel="noreferrer">
              <LinkIcon className="h-4 w-4 m-1 text-purple-500" />
            </a>
          ))}
        </div>

        {/* image */}
        <div className="flex justify-start">
          {imgSrc ? (
            <img
              className="w-[100px] h-[100px] object-cover"
              src={imgSrc}
              onError={() => {
                setImgSrc('/ethShang.png')
              }}
              alt="note-attachment"
            />
          ) : (
            ''
          )}
          {/* {note.attachments?.map((attachment, index) => (
          <div
            className='w-[100px] h-[100px] mx-1'
            key={index}>
            <img
              className='w-[100px] h-[100px] object-cover'
              src={attachment.address || '/ethShang.png'}
              typeof={attachment.mime_type}
              alt='note-attachment' />
          </div>
        ))} */}
        </div>

        {/* description */}
        <div className="text-ellipsis overflow-hidden w-full h-[20px] flex flex-start">{note.summary?.content}</div>
      </div>
    </>
  )
}

export default Note
