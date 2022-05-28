import React, { useEffect, useState, useRef } from 'react'
import useConversation from '@/hooks/useConversation'
import Spinner from '@/components/ui/Spinner'
import Message from './Message'
import useUser from '@/hooks/useUser'

interface ChatProps {
  peerAddress: string
}

const Chat = ({ peerAddress }: ChatProps) => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const { conversation, messages, sendMessage, isLoading } = useConversation(peerAddress)
  const {
    userState: { address },
  } = useUser()

  const [input, setInput] = useState<string>('')

  const handleSend = () => {
    sendMessage(input)
    setInput('')
  }

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
      <div className="w-full h-[450px] flex flex-col items-center justify-center overflow-y-scroll" ref={messagesRef}>
        {isLoading ? (
          <Spinner />
        ) : (
          messages.map((msg, index) => (
            <Message key={index} message={msg.content} self={msg.senderAddress === address} />
          ))
        )}
      </div>

      {/* bottom - input window */}
      <div className="w-full h-[90px] flex justify-center items-center border-t-2">
        <input
          type={'text'}
          className="mx-5 w-[300px] h-[40px] p-5 border-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend()
            }
          }}
        />

        <button
          className="w-[70px] h-[40px] bg-transparent text-purple-700 font-semibold hover:text-white hover:border-pink-600 hover:border-transparent 
            rounded hover:bg-gradient-to-r from-purple-400 to-pink-600 border"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
