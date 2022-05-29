import React, { useEffect, useState, useRef, useCallback } from 'react'
import useConversation from '@/hooks/useConversation'
import Spinner from '@/components/ui/Spinner'
import Message from './Message'
import useUser from '@/hooks/useUser'
import TextInput from './TextInput'

interface ChatProps {
  peerAddress: string
}

const Chat = ({ peerAddress }: ChatProps) => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const { conversation, messages, sendMessage, isLoading } = useConversation(peerAddress)
  const {
    userState: { address },
  } = useUser()

  const handleSend = useCallback(
    (input: string) => {
      sendMessage(input)
    },
    [sendMessage],
  )

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scroll({ behavior: 'smooth', top: messagesRef.current.scrollHeight })
    }
  }, [messages])

  return (
    <div className="w-[500px] h-[600px] flex flex-col">
      {/* top - avatar window */}
      <div className="h-[60px] border-b-2">{peerAddress}</div>

      {/* middle - message window */}
      <div className="w-full h-[450px] flex flex-col overflow-y-scroll p-2" ref={messagesRef}>
        {isLoading && !messages.length ? (
          <div className="w-full h-[450px] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          messages.map((msg, index) => (
            <Message key={index} message={msg.content} self={msg.senderAddress === address} />
          ))
        )}
      </div>

      {/* bottom - input window */}
      <TextInput handleSend={handleSend} />
    </div>
  )
}

export default Chat
