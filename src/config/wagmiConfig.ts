import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { bellecour } from './bellecourChainConfig';
import { createAppKit } from '@reown/appkit/react';

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  networks: [bellecour],
  transports: {
    [bellecour.id]: http(),
  },
  ssr: true,
  projectId,
})

const metadata = {
  name: 'appkit-example',
  description: 'AppKit Example',
  url: 'https://appkitexampleapp.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [bellecour],
  projectId,
  defaultNetwork: bellecour,
  features: {
    email: false,
    socials: false,
  },
  metadata: metadata,
  allWallets: 'HIDE',
  allowUnsupportedChain: false,
  enableWalletGuide: false,
});
