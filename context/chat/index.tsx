import { useContext, useState, createContext, ReactNode } from 'react';

type ChatType = {
    mood: string,
    response: string,
    colours: string[]
}

type ChatContextType = {
    chat: ChatType | null,
    setResponse: (res: ChatType) => void
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({children}: {children: ReactNode}) {
    const [chat, setChat] = useState<ChatType | null>(null);

    const setResponse = (res: ChatType) => {
        setChat(res);
    }

    return (
        <ChatContext.Provider value={{chat, setResponse}}>
            {children}
        </ChatContext.Provider>
    )
}

export default function useChat() {
    const context = useContext(ChatContext);
    if (context === null) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context
}