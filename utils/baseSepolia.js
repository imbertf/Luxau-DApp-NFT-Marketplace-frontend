// const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC || "";
// export const baseSepolia = {
//   id: 84531,
//   name: 'Base Sepolia',
//   nativeCurrency: { name: 'Base Sepolia Ether', symbol: 'BSEP', decimals: 18 },
//   rpcUrls: {
//     default: {
//       http: [RPC],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'Basescan',
//       url: 'https://sepolia.basescan.org',
//       apiUrl: 'https://api-sepolia.basescan.org/api',
//     },
//   },
//   contracts: {
//     multicall3: {
//       address: '0xca11bde05977b3631167028862be2a173976ca11',
//       blockCreated: 751532,
//     },
//     ensRegistry: { address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
//     ensUniversalResolver: {
//       address: '0xc8Af999e38273D658BE1b921b88A9Ddf005769cC',
//       blockCreated: 5317080,
//     },
//   },
//   testnet: true,
// }
import { chainConfig } from '../../op-stack/chainConfig.js'
import { defineChain } from '../../utils/chain/defineChain.js'

const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC || "";

const sourceId = 11_155_111 // sepolia

export const baseSepolia = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 84532,
  network: 'base-sepolia',
  name: 'Base Sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
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
    ...chainConfig.contracts,
    l2OutputOracle: {
      [sourceId]: {
        address: '0x84457ca9D0163FbC4bbfe4Dfbb20ba46e48DF254',
      },
    },
    portal: {
      [sourceId]: {
        address: '0x49f53e41452c74589e85ca1677426ba426459e85',
        blockCreated: 4446677,
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: '0xfd0Bf71F60660E2f608ed56e1659C450eB113120',
        blockCreated: 4446677,
      },
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1059647,
    },
  },
  testnet: true,
  sourceId,
})