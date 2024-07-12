// config
'use client'
import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract, useReadContract } from "wagmi";
import { contractMarketplaceAddress, contractMarketplaceAbi } from "@/constants";
import { parseEther } from "viem";
import { Badge } from "../ui/badge";

// components
import Informations from "./Information";

// UI
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { toast, useToast } from "../ui/use-toast";


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
    if (nft.status === true) {
      toast({
        title: "Error",
        description: "NFT Already SOLD",
        className: 'bg-none rounded-none border-red-600 text-red-600'
      });
    }
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


  return (<>
    <Card className="py-3 m-5 rounded-none shadow-md max-w-80">
      {nft.status && <Badge variant="destructive" className="rounded-none relative ">SOLD</Badge>}
      <CardContent>
        <img src="https://lavender-elaborate-rabbit-30.mypinata.cloud/ipfs/QmTZA9yko3gS5m8VYWsPUJ7N1YCKFTjgcgPuBAcrwxe8KB/img/product_0.png" />
      </CardContent>
      <CardContent className="space-y-2">
        <CardTitle className="text-lg"> ID #{nft.tokenId}</CardTitle>
        <CardDescription className="break-words"><span className="font-bold">Brand</span> {nft.brandName}</CardDescription>
        <CardDescription>{nft.description}</CardDescription>
      </CardContent>
      <CardContent className="text-right">
        <CardDescription className="font-bold text-black text-lg">{nft.price} ETH</CardDescription>
        <Button variant="outline" className="rounded-none bg-[#D4AF37] text-white shadow-md mt-3" onClick={() => buyNFT(nft)} >{setIsPending ? 'Buying...' : 'Buy'}</Button>
      </CardContent>
    </Card >
    <Informations hash={hash} isConfirming={isConfirming} isConfirmed={isConfirmed} error={error} /></>
  )
}

export default NFTCard