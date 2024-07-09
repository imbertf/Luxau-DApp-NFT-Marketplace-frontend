'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { useWaitForTransactionReceipt, useWriteContract, useReadContract } from "wagmi";
import { contractMarketplaceAddress, contractMarketplaceAbi } from "@/constants";
import { useEffect, useState } from "react";

const NFTCard = ({ nft }) => {
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState([]);

  const { data: hash, isPending: setIsPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: errorConfirmation, refetch } = useWaitForTransactionReceipt({ hash })


  // const { data: marketData, isSuccess } = useReadContract({
  //   address: contractMarketplaceAddress,
  //   abi: contractMarketplaceAbi,
  //   functionName: "registeredBrands",
  //   args: [brand]
  // })


  useEffect(() => {
    if (nft && nft.brand) {
      setBrands(prevBrands => [...prevBrands, nft.brand]);
    }
  }, [nft]);



  return (
    <Card className=" py-3">
      <CardContent>
        <img src={nft.tokenURI} />
      </CardContent>
      <CardContent>
        <CardTitle className="text-lg"> ID #{nft.tokenId}</CardTitle>
        <CardDescription>{nft.brand}</CardDescription>
        <CardDescription>{nft.description}</CardDescription>
      </CardContent>
      <CardContent className="text-right">
        <CardDescription className="font-bold text-black text-lg">{nft.price} ETH</CardDescription>
        <Button variant="outline" className="rounded-none bg-[#D4AF37] text-white shadow-md mt-3" >{setIsPending ? 'Buying...' : 'Buy'}</Button>
      </CardContent>
    </Card>
  )
}

export default NFTCard