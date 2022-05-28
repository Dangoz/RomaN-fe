import IXMTP from '@/types/xmtp'
import { Message } from '@xmtp/xmtp-js'

export enum XMTPActionTypes {
  connect = 'CONNECT',
  disconnect = 'DISCONNECT',
  syncConversations = 'CONVERSE',
  syncMessages = 'MESSAGE',
}

export type XMTPActionPayloads = {
  [XMTPActionTypes.connect]: {
    address: string
    signer: IXMTP['signer']
    client: IXMTP['client']
  }
  [XMTPActionTypes.disconnect]: {}
  [XMTPActionTypes.syncConversations]: {
    conversations: IXMTP['conversations']
  }
  [XMTPActionTypes.syncMessages]: {
    peerAddress: string
    messages: Message[]
  }
}

export type XMTPActions =
  | {
      type: XMTPActionTypes.connect
      payload: XMTPActionPayloads[XMTPActionTypes.connect]
    }
  | {
      type: XMTPActionTypes.disconnect
      payload: XMTPActionPayloads[XMTPActionTypes.disconnect]
    }
  | {
      type: XMTPActionTypes.syncConversations
      payload: XMTPActionPayloads[XMTPActionTypes.syncConversations]
    }
  | {
      type: XMTPActionTypes.syncMessages
      payload: XMTPActionPayloads[XMTPActionTypes.syncMessages]
    }
