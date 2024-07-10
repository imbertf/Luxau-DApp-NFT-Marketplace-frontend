import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const RPC = "https://sepolia.base.org";

export const publicClient = createPublicClient({
  chain: base,
  transport: http(RPC),
})