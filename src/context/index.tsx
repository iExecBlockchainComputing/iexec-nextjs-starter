'use client'

import { wagmiAdapter } from '@/config/wagmiConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode } from 'react'
import { WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

function ContextProvider({ children }: { children: ReactNode}) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider