"use client"

import Chat from "@/components/Chat";

export default function Home() {
  return (
    <div className="flex flex-col w-[100vw] md:max-w-[50rem] mx-auto h-screen gap-2 ">
      <Chat />
    </div>
  );
}
