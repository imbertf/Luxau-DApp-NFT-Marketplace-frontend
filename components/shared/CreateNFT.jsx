'use client'
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { contractMarketplaceAddress, contractMarketplaceAbi } from "@/constants";

const CreateNFT = () => {
  return (
    <section><h2>Create new NFT</h2></section>
  )
}

export default CreateNFT