"use client"

import Query from "@/components/Query";
import Response from "@/components/Response";
import { ChatProvider } from "@/context/chat";

export default function Home() {
  return (
    <ChatProvider>
      <div className="flex flex-col w-full h-screen gap-2">
        <Query />
        <Response />
      </div>
    </ChatProvider>
  );
}
