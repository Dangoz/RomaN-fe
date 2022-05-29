import React, { useState } from 'react'

const TextInput = ({ handleSend }: { handleSend: (input: string) => void }) => {
  const [input, setInput] = useState<string>('')
  return (
    <div className="w-full h-[90px] flex justify-center items-center border-t-2">
      <input
        type={'text'}
        className="mx-2 w-[300px] h-[40px] border-2 rounded px-3"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend(input)
            setInput('')
          }
        }}
      />

      <button
        className="w-[70px] h-[40px] bg-transparent text-purple-700 font-semibold hover:text-white hover:border-pink-600 hover:border-transparent 
      rounded hover:bg-gradient-to-r from-purple-400 to-pink-600 border-2"
        onClick={() => {
          handleSend(input)
          setInput('')
        }}
      >
        Send
      </button>
    </div>
  )
}

export default TextInput
