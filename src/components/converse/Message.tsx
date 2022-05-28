import React from 'react'

interface MessageProps {
  message: string
  self: boolean // whether message is sent by self or other
}
const Message = ({ message, self }: MessageProps) => {
  return (
    <div className={'w-[460px] flex' + (self ? ' justify-end' : ' justify-start')}>
      <div
        className={
          'relative flex items-center rounded-lg shadow-md w-[200px] my-2 py-2 px-3' +
          (self ? ' bg-lime-300 justify-end' : ' bg-purple-100 justify-start')
        }
      >
        {message}
      </div>
    </div>
  )
}

export default Message
