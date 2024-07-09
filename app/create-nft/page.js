'use client';

import NotConnected from "@/components/shared/NotConnected";
import CreateNFT from "@/components/shared/CreateNFT";

import { useAccount } from "wagmi";

const page = () => {

  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center ">
      {isConnected ? (
        <>
          <CreateNFT />
        </>
      ) : (
        <NotConnected />
      )}
    </div>
  )
}

export default page