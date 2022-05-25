import { useContext } from 'react'
import { userContext } from '@/states/user/userContext'
import { IUserContext } from '@/states/user/userContext'

const useUser = (): IUserContext => {
  const context = useContext(userContext)
  return context
}

export default useUser
