import { Client, Conversation, Message } from '@xmtp/xmtp-js'
import { Signer } from 'ethers'

export default interface IXMTP {
  address: string
  signer: Signer | null
  client: Client | null
  conversations: Conversation[] // list of ongoing conversations
  messageStore: IMessageStore // message store for current active conversation
}

export interface IMessageStore {
  [peerAddress: string]: Message[]
}
