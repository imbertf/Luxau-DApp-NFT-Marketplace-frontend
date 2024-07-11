'use client'
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { contractMarketplaceAddress, contractMarketplaceAbi, contractNFTAddress, contractNFTAbi } from "@/constants";
import { parseEther } from "viem";

// components
import Informations from "./Information";

// UI
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";



const CreateNFT = () => {
  const [ethValue, setEthValue] = useState(null)
  const [tokenId, setTokenId] = useState(null)
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState("")
  const { toast } = useToast();

  const { address } = useAccount();
  const { data: hash, isPending: setIsPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: errorConfirmation, refetch } = useWaitForTransactionReceipt({ hash })

  // const { data: marketData, isSuccess } = useReadContract({
  //   address: contractMarketplaceAddress,
  //   abi: contractMarketplaceAbi,
  //   functionName: "brandNFTs",
  //   args: [address, 0]
  // })
  // console.log(marketData);


  const handleMint = async () => {
    // check valid input before transaction
    if (ethValue === "" || ethValue < 0.0001) {
      toast({
        title: "Error",
        description: "Minimum value is 0.0001 ETH",
        className: 'bg-none rounded-none border-red-600 text-red-600'
      });
    } else {
      try {
        await writeContract({
          address: contractNFTAddress,
          abi: contractNFTAbi,
          functionName: 'safeMint',
          value: parseEther(ethValue)
        })
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleCreateNFT = async () => {
    // check valid input before transaction
    if (ethValue === "" || ethValue < 1) {
      toast({
        title: "Error",
        description: "Minimum value is 1 ETH",
        className: 'bg-none rounded-none border-red-600 text-red-600'
      });
    } else {
      try {
        await writeContract({
          address: contractMarketplaceAddress,
          abi: contractMarketplaceAbi,
          functionName: 'createNFT',
          args: [contractNFTAddress, tokenId, price, description],
          value: parseEther(ethValue)
        })
      } catch (error) {
        console.error(error);
      }
    }
  }

  // refrech all inputs after transaction
  useEffect(() => {
    if (isConfirmed) {
      setEthValue(0)
      setTokenId(null)
      setPrice(null)
      setDescription("")
      refetch();
    }
  }, [isConfirmed, refetch])

  return (
    <section className="w-1/2 my-10 space-y-3">
      <h2 className="text-center text-xl mb-10">Create new NFT</h2>
      <div className="space-y-5">
        <div className="space-y-2">
          <h3 className="mb-3">Please MINT NFT first</h3>
          <div>
            <Label htmlFor="price">ETH required to MINT</Label>
            <Input type="number" placeholder="Min value 0.0001 ETH" onChange={(e) => setEthValue(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <Button variant="outline" className="rounded-none bg-[#D4AF37] text-white shadow-md mt-3" onClick={handleMint}>{setIsPending ? 'Minting...' : 'Mint'}</Button>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="mb-3">Please add NFT informations</h3>
          <div>
            <Label htmlFor="tokenId">Select Token ID</Label>
            <Input type="number" placeholder="ex: 4" onChange={(e) => setTokenId(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="price">Price you want to sell NFT</Label>
            <Input type="number" placeholder="ex: 1500" onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="description">NFT Description</Label>
            <Input type="text" placeholder="ex: The necklace features a luxurious and bold design with a layered structure..." onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="price">ETH required to create NFT</Label>
            <Input type="number" placeholder="Min value 1 ETH" onChange={(e) => setEthValue(e.target.value)} />
          </div>

          <div className="flex justify-end">
            <Button variant="outline" className="rounded-none bg-[#D4AF37] text-white shadow-md mt-3" onClick={handleCreateNFT}>{setIsPending ? 'Creating...' : 'Create'}</Button>
          </div>
        </div>
      </div>
      <Informations hash={hash} isConfirming={isConfirming} isConfirmed={isConfirmed} error={error} />
    </section>
  )
}

export default CreateNFT