import IUser from '@/types/user'
import { UserActionTypes, UserActions } from './actions'
import { initialState } from './userContext'

type Reducer<S, A> = (state: S, action: A) => S

const userReducer: Reducer<IUser, UserActions> = function (state: IUser, action: UserActions) {
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
