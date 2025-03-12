"use client";

import { KeyboardEvent, useRef, useState } from "react";
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { moodSchema } from "@/src/app/api/query/schema";
import { useColour } from '@/context/ColourContext';

export default function Chat() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');
  const { renderColours } = useColour();


  const { object, submit, error } = useObject({
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
    }
  }
  return (
    <>
      <form onKeyDown={handleKeyDown} className="flex flex-row w-[100vw] h-auto justify-center items-center mt-2">
        <input 
          ref={inputRef}
          onChange={e => setInput(e.target.value)} 
          className="w-[80vw] h-auto p-1 border-2 border-[#c1c1c1] rounded-sm" 
          placeholder="Press Enter to submit"
        />
      </form>
      <div className='flex-1'>
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