"use client"

import useChat from '@/context/chat'

export default function Response() {
  const {chat} = useChat();
  return (
    <div className='flex-1'>{chat?.response}</div>
  )
}
