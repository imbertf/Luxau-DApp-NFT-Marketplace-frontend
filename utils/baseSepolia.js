
require('dotenv').config();

const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC || "https://sepolia.base.org/";

export const baseSepolia = {
  id: 84532,
  network: 'base-sepolia',
  name: 'Base Sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://base-sepolia.g.alchemy.com/v2/ggQZpqtem_YhSCU5-RexhT5KgbpE8U2b"],
    },
  },
  blockExplorers: {
    default: {
      name: 'Basescan',
      url: 'https://sepolia.basescan.org',
      apiUrl: 'https://api-sepolia.basescan.org/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 751532,
    },
  },
  testnet: true,
}