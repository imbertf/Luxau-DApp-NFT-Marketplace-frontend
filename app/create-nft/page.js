'use client';

import NotConnected from "@/components/shared/NotConnected";
import CreateNFT from "@/components/shared/CreateNFT";

import { useAccount } from "wagmi";

const page = () => {

  const { isConnected } = useAccount();

  return (
    <>
      {isConnected ? (
        <CreateNFT />
      ) : (
        <NotConnected />
      )}
    </>
  )
}

export default page