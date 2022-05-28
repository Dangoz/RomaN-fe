import useXMTP from './useXMTP'
import { Stream, Message, Conversation } from '@xmtp/xmtp-js'
import { useState, useCallback, useEffect } from 'react'
import { XMTPActionPayloads, XMTPActionTypes } from '@/states/xmtp/actions'

const useConversation = (peerAddress: string, onMessageCallback?: () => void) => {
  const {
    xmtpState: { signer, client, conversations, messageStore },
    xmtpDispatch,
  } = useXMTP()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [stream, setStream] = useState<Stream<Message> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // initialize the current active conversation
  useEffect(() => {
    const initConversation = async () => {
      console.log('new peerAddress: ' + peerAddress)
      if (!client) {
        return
      }
      try {
        const list = await client.conversations.list()
        console.log('having talked to ' + list[0].peerAddress, client.keys)

        const convo = await client.conversations.newConversation(list[0].peerAddress)
        setConversation(convo)
        console.log('connection success ' + convo.peerAddress)
      } catch (err) {
        console.log((err as Error).message)
      }
    }
    initConversation()
  }, [client, peerAddress])

  // initialize message stream for current active conversation, and sync messages to context store
  useEffect(() => {
    const initStream = async () => {
      if (!conversation) {
        return
      }
      const stream = await conversation.streamMessages()
      setStream(stream)
      for await (const message of stream) {
        const messageStorePayload: XMTPActionPayloads[XMTPActionTypes.syncMessages] = {
          peerAddress,
          messages: [message],
        }
        xmtpDispatch({
          type: XMTPActionTypes.syncMessages,
          payload: messageStorePayload,
        })

        if (onMessageCallback) {
          onMessageCallback()
        }
      }
    }
    initStream()
  }, [conversation, peerAddress, xmtpDispatch, onMessageCallback])

  // upon new conversation, retrieve all messages of current active conversation
  useEffect(() => {
    const initConversation = async () => {
      if (!conversation) {
        return
      }
      setIsLoading(true)
      const existingMessages = await conversation.messages({})
      const messageStorePayload: XMTPActionPayloads[XMTPActionTypes.syncMessages] = {
        peerAddress,
        messages: existingMessages,
      }
      xmtpDispatch({
        type: XMTPActionTypes.syncMessages,
        payload: messageStorePayload,
      })

      if (onMessageCallback) {
        onMessageCallback()
      }
      setIsLoading(false)
    }
    initConversation()
  }, [conversation, peerAddress, xmtpDispatch, onMessageCallback])

  // close message stream on peerAdress change
  useEffect(() => {
    const closeStream = async () => {
      if (!stream) {
        return
      }
      await stream.return()
    }
    closeStream()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerAddress])

  // get messages of peerAddress from messageStore
  const getMessage = (peerAddress: string): Message[] => {
    const messages = messageStore[peerAddress] || []
    return messages
  }

  // send message to current active conversation
  const sendMessage = useCallback(
    async (message: string) => {
      if (!conversation) {
        return
      }
      alert(`message sending: ${message}`)
      await conversation.send(message)
    },
    [conversation],
  )

  return {
    conversation,
    messages: getMessage(peerAddress),
    sendMessage,
    isLoading,
  }
}

export default useConversation
