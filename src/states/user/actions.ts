import IUser from '@/types/user'
import { ethers, Signer } from 'ethers'

export enum UserActionTypes {
  login = 'LOG_IN',
  logout = 'LOG_OUT',
}

export type UserActionPayloads = {
  [UserActionTypes.login]: {
    address: string
    provider: IUser['provider']
  }
  [UserActionTypes.logout]: {}
}

export type UserActions =
  | {
      type: UserActionTypes.login
      payload: UserActionPayloads[UserActionTypes.login]
    }
  | {
      type: UserActionTypes.logout
      payload: UserActionPayloads[UserActionTypes.logout]
    }
