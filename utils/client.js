import { createPublicClient, http } from "viem";
import { baseSepolia, hardhat } from "viem/chains";
require("dotenv").config();

const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;

export const publicClient = createPublicClient({
  chain: process.env.NODE_ENV === "production" ? baseSepolia : hardhat,
  transport: http(process.env.NODE_ENV === "production" ? RPC : ""),
})