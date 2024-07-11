import { createPublicClient, http } from "viem";
import { baseSepolia, hardhat } from "viem/chains";
require("dotenv").config();


// const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;

// export const publicClient = createPublicClient({
//   chain: baseSepolia,
//   transport: http(RPC),
// })

const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;
const CHAIN = process.env.NEXT_PUBLIC_CHAIN;

export const publicClient = createPublicClient({
  chain: process.env.NODE_ENV === "production" ? baseSepolia : hardhat,
  transport: http(process.env.NODE_ENV === "production" ? RPC : ""),
})