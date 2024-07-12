'use client'
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractMarketplaceAddress, contractMarketplaceAbi, contractNFTAddress, contractNFTAbi } from "@/constants";
import { parseEther } from "viem";
import { publicClient } from "@/utils/client";
import { parseAbiItem } from "viem";

// components
import NFTCard from "@/components/shared/NFTCard";
import NotConnected from "@/components/shared/NotConnected";

export default function Home() {
  const [events, setEvents] = useState([]);
  const { address, isConnected } = useAccount();
  const { data: hash, isPending: setIsPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: errorConfirmation, refetch } = useWaitForTransactionReceipt({ hash });

  const getEvents = async () => {
    const createNFT = await publicClient.getLogs({
      address: contractMarketplaceAddress,
      event: parseAbiItem('event NFTCreated(address brandAddress, uint256 tokenId, uint256 price, string brandName, string description)'),
      fromBlock: 0n,
    });
    const mintNFT = await publicClient.getLogs({
      address: contractNFTAddress,
      event: parseAbiItem('event NFTMinted(uint256 tokenId, address from, address to, string tokenURI)'),
      fromBlock: 0n,
    });
    const NFTSold = await publicClient.getLogs({
      address: contractMarketplaceAddress,
      event: parseAbiItem('event NFTSold(address from, address to, uint256 id, uint256 price, bool isSold)'),
      fromBlock: 0n,
    });

    const combinedEvents = createNFT.map((event) => ({
      brand: event.args.brandAddress,
      tokenId: event.args.tokenId.toString(),
      price: event.args.price.toString(),
      brandName: event.args.brandName,
      description: event.args.description,
      blockNumber: Number(event.blockNumber),
    })).concat(
      mintNFT.map((event) => ({
        tokenId: event.args.tokenId.toString(),
        tokenURI: event.args.tokenURI,
        blockNumber: Number(event.blockNumber),
      })),
      NFTSold.map((event) => ({
        tokenId: event.args.id.toString(),
        status: event.args.isSold,
        blockNumber: Number(event.blockNumber),
      }))
    );

    combinedEvents.sort((a, b) => b.blockNumber - a.blockNumber);

    setEvents(combinedEvents);
  };

  useEffect(() => {
    if (address) {
      getEvents();
    }
  }, [address]);

  // Take all objects sharing the same tokenId to merge them and create a new array
  const mergedData = events.reduce((acc, item) => {
    if (!acc[item.tokenId]) {
      acc[item.tokenId] = { ...item };
    } else {
      // Merge objects while preserving the latest status
      acc[item.tokenId] = { ...acc[item.tokenId], ...item, status: item.status !== undefined ? item.status : acc[item.tokenId].status };
    }
    return acc;
  }, {});

  const mergedEvents = Object.values(mergedData);

  return (
    <div>
      {isConnected ? (
        <section className="flex flex-col items-center my-10">
          <h2 className="text-center text-xl">NFT List</h2>
          <div className="flex flex-wrap justify-center w-3/4">
            {mergedEvents.map((event) => (
              <NFTCard nft={event} key={crypto.randomUUID()} />
            ))}
          </div>
        </section>
      ) : (
        <NotConnected />
      )}
    </div>
  );
}
