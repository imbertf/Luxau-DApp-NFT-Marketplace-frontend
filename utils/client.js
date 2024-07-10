import { createPublicClient, http } from "viem";
import { baseSepolia, hardhat } from "viem/chains";

const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || "";

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(`${RPC}`),
})

// export const publicClient = createPublicClient({
//   chain: hardhat,
//   transport: http(),
// })