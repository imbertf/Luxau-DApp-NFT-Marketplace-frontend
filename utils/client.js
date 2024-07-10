import { createPublicClient, http } from "viem";
import { baseSepolia, hardhat } from "viem/chains";

const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || "https://sepolia.base.org/";

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http("https://base-sepolia.g.alchemy.com/v2/ggQZpqtem_YhSCU5-RexhT5KgbpE8U2b"),
})

// export const publicClient = createPublicClient({
//   chain: hardhat,
//   transport: http(),
// })