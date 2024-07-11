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
import { toast, useToast } from "../ui/use-toast";
import { parseEther } from "viem";
import { Badge } from "../ui/badge";

const NFTCard = ({ nft }) => {
  const [brands, setBrands] = useState([]);

  const { toast } = useToast()

  const { data: hash, isPending: setIsPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: errorConfirmation, refetch } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (nft && nft.brand) {
      setBrands(prevBrands => [...prevBrands, nft.brand]);
    }
  }, [nft]);

  const buyNFT = async (nft) => {
    try {
      await writeContract({
        address: contractMarketplaceAddress,
        abi: contractMarketplaceAbi,
        functionName: 'buyNFT',
        args: [nft.brand, nft.tokenId],
        value: nft.price
      })
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Card className="py-3 rounded-none shadow-md max-w-80">
      <CardContent>
        <img src="https://lavender-elaborate-rabbit-30.mypinata.cloud/ipfs/QmTZA9yko3gS5m8VYWsPUJ7N1YCKFTjgcgPuBAcrwxe8KB/img/product_0.png" />
      </CardContent>
      <CardContent className="space-y-2">
        <CardTitle className="text-lg"> ID #{nft.tokenId}</CardTitle>
        <CardDescription className="break-words"><span className="font-bold">Brand</span> {nft.brand}</CardDescription>
        <CardDescription>{nft.description}</CardDescription>
      </CardContent>
      <CardContent className="text-right">
        <CardDescription className="font-bold text-black text-lg">{nft.price} ETH</CardDescription>
        <Button variant="outline" className="rounded-none bg-[#D4AF37] text-white shadow-md mt-3" onClick={() => buyNFT(nft)} >{setIsPending ? 'Buying...' : 'Buy'}</Button>
      </CardContent>
    </Card >
  )
}

export default NFTCard