import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const RPC = process.env.ALCHEMY_RPC_URL;

export const publicClient = createPublicClient({
  chain: base,
  transport: http(RPC),
})