import React, { useEffect, useState } from 'react'
import useConversation from '@/hooks/useConversation'

interface ChatProps {
  peerAddress: string
}

const Chat = ({ peerAddress }: ChatProps) => {
  const { conversation, messages, sendMessage, isLoading } = useConversation(peerAddress)

  const [input, setInput] = useState<string>('')

  const handleSend = () => {
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="w-[500px] h-[600px] flex flex-col">
      {/* top - avatar window */}
      <div className="h-[60px] border-b-2">{peerAddress}</div>

      {/* middle - message window */}
      <div className="h-[450px] ">
        {messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}
      </div>

      {/* bottom - input window */}
      <div className="w-full h-[90px] flex justify-center items-center border-t-2">
        <input
          type={'text'}
          className="mx-5 w-[300px] h-[40px] p-5 border-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
