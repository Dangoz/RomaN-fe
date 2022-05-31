import { Menu, Transition } from '@headlessui/react'
import { LogoutIcon } from '@heroicons/react/solid'
import useUser from '@/hooks/useUser'
import connect from '@/common/connect'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { BanIcon } from '@heroicons/react/outline'
import useCyberConnect from '@/hooks/useCyberConnect'

interface PeerHeaderMenuProps {
  peerAddress: string
}

const PeerHeaderMenu = ({ peerAddress }: PeerHeaderMenuProps) => {
  const {
    userState: { provider },
  } = useUser()
  const { unfollow, block } = useCyberConnect(provider)

  const handleBlock = async () => {
    // disconnect current relationship with target peer
    await unfollow(peerAddress)
    // establish block relationship (REPORT) with target peer
    await block(peerAddress)
  }

  return (
    <>
      <Menu>
        <Menu.Button>
          <div className="w-[200px] flex justify-center pl-6">
            <DotsHorizontalIcon className="h-6 w-6" />
          </div>
        </Menu.Button>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items
            className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 
        rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none 
        transform scale-95"
          >
            <Menu.Item>
              <button
                className="text-gray-900 group w-full flex items-center rounded-md text-sm
                hover:bg-purple-400 pl-2 py-2 border-solid border-2 border-purple-500"
                onClick={handleBlock}
              >
                <BanIcon className="mx-2 h-6 w-6" />
                Block
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default PeerHeaderMenu
