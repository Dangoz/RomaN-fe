import IUser from '@/types/user'
import React, { createContext, useReducer } from 'react'
import { UserActions } from './actions'
import userReducer from './reducer'

// default unconnected data for user/wallet
export const initialState: IUser = {
  address: '',
  provider: null,
}

export interface IUserContext {
  userState: IUser
  userDispatch: React.Dispatch<UserActions>
}

export const userContext = createContext<IUserContext>({
  userState: initialState,
  userDispatch: () => {},
})

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialState)

  return (
    <>
      <userContext.Provider value={{ userState, userDispatch }}>{children}</userContext.Provider>
    </>
  )
}

export default UserContextProvider
