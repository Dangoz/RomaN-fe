import IUser from '@/types/user'
import { UserActionTypes, UserActions } from './actions'
import { initialState } from './userContext'
import Reducer from '../reducerType'

const userReducer: Reducer<IUser, UserActions> = (state: IUser, action: UserActions) => {
  switch (action.type) {
    case UserActionTypes.login:
      return { ...state, ...action.payload }
    case UserActionTypes.logout:
      return initialState
    default:
      return state
  }
}

export default userReducer
