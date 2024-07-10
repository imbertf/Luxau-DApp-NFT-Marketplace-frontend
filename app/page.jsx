'use client'
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { contractMarketplaceAddress, contractMarketplaceAbi, contractNFTAddress, contractNFTAbi } from "@/constants";
import { parseEther } from "viem";
// import { publicClient } from "@/utils/client";
import { baseSepolia } from "@/utils/baseSepolia";
import { parseAbiItem } from "viem";

// components
import NFTCard from "@/components/shared/NFTCard";


export default function Home() {
  const [events, setEvents] = useState([])
  const { address } = useAccount();
  const { data: hash, isPending: setIsPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: errorConfirmation, refetch } = useWaitForTransactionReceipt({ hash })


  const getEvents = async () => {
    const createNFT = await baseSepolia.getLogs({
      address: contractMarketplaceAddress,
      event: parseAbiItem('event NFTCreated(address brandAddress, uint256 tokenId, uint256 price, string description)'),
      fromBlock: 0n,
    })
    const mintNFT = await baseSepolia.getLogs({
      address: contractNFTAddress,
      event: parseAbiItem('event NFTMinted(uint256 tokenId, address from, address to, string tokenURI)'),
      fromBlock: 0n,
    })

    const combinedEvents = createNFT.map((event) => ({
      brand: event.args.brandAddress,
      tokenId: event.args.tokenId.toString(),
      price: event.args.price.toString(),
      description: event.args.description,
      blockNumber: Number(event.blockNumber)
    })).concat(
      mintNFT.map((event) => ({
        tokenId: event.args.tokenId.toString(),
        tokenURI: event.args.tokenURI,
        blockNumber: Number(event.blockNumber)
      }))
    )

    combinedEvents.sort(function (a, b) {
      return b.blockNumber - a.blockNumber;
    });

    setEvents(combinedEvents)
  }

  useEffect(() => {
    if (address) {
      getEvents()
    }
  }, [address])

  // Take all objects sharing the same tokenId to merge them and create a new array
  const mergedData = events.reduce((acc, item) => {
    if (!acc[item.tokenId]) {
      acc[item.tokenId] = { ...item };
    } else {
      acc[item.tokenId] = { ...acc[item.tokenId], ...item };
    }
    return acc;
  }, {});

  const mergedEvents = Object.values(mergedData);

  return (
    <section className="flex flex-col items-center my-10">
      <h2 className="text-center text-xl">NFT List</h2>
      <div >
        {mergedEvents.map((event) => (
          <NFTCard nft={event} key={crypto.randomUUID()} />
        ))}
      </div>
    </section>
  );
}
