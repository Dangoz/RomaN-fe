import React from 'react'

interface MessageProps {
  message: string
  self: boolean // whether message is sent by self or other
}
const Message = ({ message, self }: MessageProps) => {
  return (
    <div className={'relative w-full my-2 flex ' + (self ? ' justify-end' : ' justify-start')}>
      <div className={'w-[200px] h-full px-6 py-2 rounded ' + (self ? ' bg-green-300' : ' bg-slate-300')}>
        {message}
      </div>
    </div>
  )
}

export default Message
