"use client";

import { KeyboardEvent, useRef, useState } from "react";
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { moodSchema } from "@/src/app/api/query/schema";
import { useColour } from '@/context/ColourContext';

export default function Chat() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');
  const { renderColours } = useColour();


  const { object, submit, error, isLoading } = useObject({
    api: '/api/query',
    schema: moodSchema,
    onFinish: (data) => {
      if (data.object?.colours) {
        renderColours(data.object.colours as string[])        
      }
    }
  });
  

  const handleKeyDown = async (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();   
      submit(input);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }
  return (
    <>
      <form onKeyDown={handleKeyDown} className="flex flex-row w-[100vw] h-auto justify-center items-center mt-2">
        <input 
          ref={inputRef}
          onChange={e => setInput(e.target.value)} 
          className={`w-[80vw] 
            h-auto 
            p-1 
            border-2 
            border-[#c1c1c1] 
            rounded-sm 
            ${isLoading && 'bg-gradient-to-r from-[#c0c0c0] via-[#ffffff] to-[#c0c0c0] bg-[size:200%_100%] bg-[position:0%_0] animate-shimmer opacity-30'}`}
          placeholder="Press Enter to submit"
          disabled={isLoading}
        />
      </form>
      <div className='flex-1 p-2'>
        <div className="">
          {object?.response}
        </div>

        {error && (
          <>
            <div>An error occurred.</div>
          </>
        )}
      </div>
    </>
  )
}