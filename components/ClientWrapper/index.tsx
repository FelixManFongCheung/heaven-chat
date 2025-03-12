'use client'

import { ColourContextProvider } from '@/context/ColourContext'
import Canvas from '@/components/Canvas'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ColourContextProvider>
      <Canvas />
      {children}
    </ColourContextProvider>
  )
}