import useXMTP from './useXMTP'
import { Stream, Message, Conversation } from '@xmtp/xmtp-js'
import { useState, useCallback, useEffect } from 'react'
import { XMTPActionPayloads, XMTPActionTypes } from '@/states/xmtp/actions'
import { ethers } from 'ethers'
import { handleError } from '@/common/alert'

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
      // valid client & peeraddress are required for establishing conversation
      if (!client || !peerAddress) {
        return
      }
      try {
        const target = checkSumAddress(peerAddress)
        const convo = await client.conversations.newConversation(target)
        setConversation(convo)
      } catch (err) {
        setConversation(null)
        handleError(err as Error)
        console.log((err as Error).message)
      }
    }
    initConversation()
  }, [client, peerAddress])

  // upon new conversation, retrieve all messages of current active conversation
  useEffect(() => {
    const initConversation = async () => {
      if (!conversation) {
        return
      }
      // load if no existing messages
      setIsLoading(true)
      const existingMessages = await conversation.messages({ pageSize: 100 })
      const messageStorePayload: XMTPActionPayloads[XMTPActionTypes.syncMessages] = {
        peerAddress: conversation.peerAddress,
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
  }, [conversation, xmtpDispatch, onMessageCallback])

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
          peerAddress: conversation.peerAddress,
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
  }, [conversation, xmtpDispatch, onMessageCallback])

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
  }, [conversation])

  // get messages of peerAddress from messageStore
  const getMessage = useCallback((): Message[] => {
    if (!conversation) {
      return []
    }
    const messages = messageStore[conversation.peerAddress] || []
    return messages
  }, [conversation, messageStore])

  // send message to current active conversation
  const sendMessage = useCallback(
    async (message: string) => {
      if (!conversation) {
        return
      }
      await conversation.send(message)
    },
    [conversation],
  )

  return {
    conversation,
    messages: getMessage(),
    sendMessage,
    isLoading, // loading state for getting existing messages of a conversation
  }
}

export default useConversation

const checkSumAddress = (address: string): string => {
  const checkSumAddress = ethers.utils.getAddress(address)
  return checkSumAddress
}
