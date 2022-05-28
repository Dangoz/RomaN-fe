import { useContext } from 'react'
import { userContext, IUserContext } from '@/states/user/userContext'

const useUser = (): IUserContext => {
  const context = useContext(userContext)
  if (context === undefined) {
    throw new Error('useUser must be used within userContextProvider')
  }
  return context
}

export default useUser
