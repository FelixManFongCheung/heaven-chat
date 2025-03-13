"use client";

import { KeyboardEvent, useRef, useState } from "react";
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { moodSchema } from "@/src/app/api/query/schema";
import { useColour } from '@/context/ColourContext';

export default function Chat() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');
  const { setColours } = useColour();


  const { object, submit, error, isLoading } = useObject({
    api: '/api/query',
    schema: moodSchema,
    onFinish: (data) => {
      console.log('finished', data);
      if (data.object?.colours) {
        console.log('Colours found:', data.object.colours); // Debug log
        setColours(data.object.colours as string[])        
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
      <form onKeyDown={handleKeyDown} className="flex flex-row w-[100%] h-auto justify-center items-center mt-2">
        <input 
          ref={inputRef}
          onChange={e => setInput(e.target.value)} 
          className={`w-[80%] 
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
      <div className='flex-1 p-8'>
        <div>
          {isLoading && (
            <svg className="text-gray-300 animate-spin inline-block flex-shrink-0 mr-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24">
              <path
                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path
                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              </path>
            </svg>
          )}
          <div className="text-gray-600 inline">
            {object?.response}
          </div>
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