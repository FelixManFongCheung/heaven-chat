"use client";

import { KeyboardEvent, useRef } from "react";
import useChat from "@/context/chat";

export default function Query() {
  const { setResponse } = useChat();  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = async (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();      
      const data = await fetch('/api/query', {
        method: 'POST',
        body: JSON.stringify({
          prompt: inputRef.current?.value
        })
      })
      const result = await data.json();
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setResponse(result);

    }
  }
  return (
    <form onKeyDown={handleKeyDown} className="flex flex-row w-[100vw] h-auto justify-center items-center mt-2">
      <input ref={inputRef} className="w-[80vw] h-auto p-1 border-2 border-[#c1c1c1] rounded-sm" placeholder="Press Enter to submit"/>
    </form>
  )
}