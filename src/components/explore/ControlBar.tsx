import React, { Dispatch, useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid'

interface ControlBarProps {
  handleSearch: (input: string) => void
}

const ControlBar = ({ handleSearch }: ControlBarProps) => {
  const [input, setInput] = useState<string>('')

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <h1
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-default text-2xl pt-2"
          style={{ fontFamily: 'papyrus' }}
        >
          Search
        </h1>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-[300px] h-[40px] border-2 px-3 border-purple-700 ml-6"
          style={{ borderRadius: '0' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setInput('')
              handleSearch(input)
            }
          }}
        />
        <button
          className="w-[40px] h-[40px] border-purple-700 flex justify-center items-center border-y-2 border-r-2"
          onClick={() => {
            setInput('')
            handleSearch(input)
          }}
        >
          <SearchIcon className="h-20 w-20" />
        </button>
      </div>
    </>
  )
}

export default ControlBar
