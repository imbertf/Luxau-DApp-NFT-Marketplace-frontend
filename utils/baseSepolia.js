const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC || "";
export const baseSepolia = {
  id: 84531,
  name: 'Base Sepolia',
  nativeCurrency: { name: 'Base Sepolia Ether', symbol: 'BSEP', decimals: 18 },
  rpcUrls: {
    default: {
      http: [RPC],
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
    ensRegistry: { address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
    ensUniversalResolver: {
      address: '0xc8Af999e38273D658BE1b921b88A9Ddf005769cC',
      blockCreated: 5317080,
    },
  },
  testnet: true,
}
