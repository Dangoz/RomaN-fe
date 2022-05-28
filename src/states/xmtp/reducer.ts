import IXMTP from '@/types/xmtp'
import { Message } from '@xmtp/xmtp-js'
import { IMessageStore } from '@/types/xmtp'
import { XMTPActionTypes, XMTPActions } from './actions'
import { initialState } from './xmtpContext'
import Reducer from '../reducerType'

const xmtpReducer: Reducer<IXMTP, XMTPActions> = (state: IXMTP, action: XMTPActions) => {
  switch (action.type) {
    case XMTPActionTypes.connect:
      return { ...state, ...action.payload }
    case XMTPActionTypes.disconnect:
      return initialState
    case XMTPActionTypes.syncConversations:
      return { ...state, ...action.payload }
    case XMTPActionTypes.syncMessages:
      const { peerAddress, messages } = action.payload
      const messageStore = state.messageStore
      const existingMessages = messageStore[peerAddress] || []
      const newMessages = filterNewMessages(existingMessages, messages)

      const newMessageStore: IMessageStore = newMessages.length
        ? { ...messageStore, [peerAddress]: existingMessages.concat(newMessages) }
        : messageStore

      console.log('NEW MESSAGE STORE:', JSON.stringify(newMessageStore, null, 2))
      return { ...state, messageStore: newMessageStore }
    default:
      return state
  }
}

export default xmtpReducer

// filter out newMessages  within messages from existingMessages
const filterNewMessages = (existingMessages: Message[], messages: Message[]): Message[] => {
  const existingMessageIds = existingMessages.map((msg) => msg.id)
  const newMessages = messages.filter((msg) => {
    return existingMessageIds.indexOf(msg.id) === -1
  })
  return newMessages
}
