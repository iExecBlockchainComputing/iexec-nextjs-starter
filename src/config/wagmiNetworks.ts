import {
  type AppKitNetwork,
  arbitrumSepolia,
  arbitrum,
} from '@reown/appkit/networks';

export { arbitrumSepolia, arbitrum } from '@reown/appkit/networks';

// Explorer slugs mapping for iExec explorer
export const explorerSlugs: Record<number, string> = {
  42161: 'arbitrum-mainnet', // Arbitrum One
  421614: 'arbitrum-sepolia-testnet', // Arbitrum Sepolia
};

const wagmiNetworks: Record<string, AppKitNetwork> = {
  arbitrumSepolia,
  arbitrum,
};

export default wagmiNetworks;
