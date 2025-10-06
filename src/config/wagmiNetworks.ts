import {
  type AppKitNetwork,
  arbitrumSepolia,
  arbitrum,
} from '@reown/appkit/networks';

export { arbitrumSepolia, arbitrum } from '@reown/appkit/networks';

export const bellecour: AppKitNetwork = {
  id: 0x86,
  name: 'iExec Sidechain',
  nativeCurrency: {
    decimals: 18,
    name: 'xRLC',
    symbol: 'xRLC',
  },
  rpcUrls: {
    public: { http: ['https://bellecour.iex.ec'] },
    default: { http: ['https://bellecour.iex.ec'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Blockscout',
      url: 'https://blockscout-bellecour.iex.ec',
    },
    default: { name: 'Blockscout', url: 'https://blockscout-bellecour.iex.ec' },
  },
};

const wagmiNetworks = {
  bellecour,
  arbitrumSepolia,
  arbitrum,
};

export default wagmiNetworks;
