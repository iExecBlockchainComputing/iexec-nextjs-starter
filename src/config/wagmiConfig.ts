import { http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/react';
import wagmiNetworks from './wagmiNetworks';
import { AppKitNetwork } from '@reown/appkit/networks';

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

if (!projectId) {
  throw new Error('You need to provide NEXT_PUBLIC_REOWN_PROJECT_ID env variable');
}

const networks = Object.values(wagmiNetworks) as [
  AppKitNetwork,
  ...AppKitNetwork[],
];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  networks: networks,
  transports: Object.fromEntries(
    Object.values(wagmiNetworks).map((network) => [network.id, http()])
  ),
  projectId,
  ssr: true,
});

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: networks,
  projectId,
  features: {
    email: false,
    socials: false,
  },
  allWallets: 'HIDE',
  allowUnsupportedChain: false,
  enableWalletGuide: false,
});

