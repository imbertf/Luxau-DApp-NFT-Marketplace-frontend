// config
'use client';
import { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { publicClient } from "@/utils/client";
import { parseAbiItem } from "viem";
import { contractMarketplaceAddress, contractMarketplaceAbi, contractNFTAddress, contractNFTAbi } from "@/constants";

// components
import Event from "@/components/shared/Events";
import NotConnected from "@/components/shared/NotConnected";
import RegisterBrand from "@/components/shared/RegisterBrand";
import RegisterClient from "@/components/shared/RegisterClient";


const page = () => {
  const [events, setEvents] = useState([])
  const { isConnected, address } = useAccount();
  const { data: marketData, isSuccess, refetch } = useReadContract({
    address: contractMarketplaceAddress,
    abi: contractMarketplaceAbi,
    functionName: "clientNFTs",
    args: [address, 0],
  })


  const getEvents = async () => {
    const registerBrand = await publicClient.getLogs({
      address: contractMarketplaceAddress,
      event: parseAbiItem('event BrandRegistered(address brandAddress)'),
      fromBlock: 0n,
    })
    const registerClient = await publicClient.getLogs({
      address: contractMarketplaceAddress,
      event: parseAbiItem('event ClientRegistered(address clientAddress)'),
      fromBlock: 0n,
    })
    const mintNFT = await publicClient.getLogs({
      address: contractNFTAddress,
      event: parseAbiItem('event NFTMinted(uint256 tokenId, address from, address to, string tokenURI)'),
      fromBlock: 0n,
    })
    const createNFT = await publicClient.getLogs({
      address: contractMarketplaceAddress,
      event: parseAbiItem('event NFTCreated(address brandAddress, uint256 tokenId, uint256 price, string brandName, string description)'),
      fromBlock: 0n,
    })
    const NFTSold = await publicClient.getLogs({
      address: contractMarketplaceAddress,
      event: parseAbiItem('event NFTSold(address from, address to, uint256 id, uint256 price, bool isSold)'),
      fromBlock: 0n,
    })


    const combinedEvents = registerBrand.map((event) => ({
      eventName: event.eventName,
      newValue: `Brand registered ${event.args.brandAddress}`,
      blockNumber: Number(event.blockNumber)
    })).concat(
      registerClient.map((event) => ({
        eventName: event.eventName,
        newValue: `Client registered ${event.args.clientAddress}`,
        blockNumber: Number(event.blockNumber)
      })),
      mintNFT.map((event) => ({
        eventName: event.eventName,
        newValue: `NFT minted ID: ${event.args.tokenId}, by ${event.args.to}`,
        blockNumber: Number(event.blockNumber)
      })),
      createNFT.map((event) => ({
        eventName: event.eventName,
        newValue: `NFT created ID: ${event.args.tokenId}, by ${event.args.brandName} ${event.args.brandAddress}, price ${event.args.price} ETH, description ${event.args.description}`,
        blockNumber: Number(event.blockNumber)
      })),
      NFTSold.map((event) => ({
        eventName: event.eventName,
        newValue: `NFT ID: ${event.args.id}, by ${event.args.from} to ${event.args.to} price ${event.args.price} ETH, status ${event.args.isSold}`,
        blockNumber: Number(event.blockNumber)
      }))
    )


    combinedEvents.sort(function (a, b) {
      return b.blockNumber - a.blockNumber;
    });

    setEvents(combinedEvents)
  }

  useEffect(() => {
    const getAllEvents = async () => {
      if (address !== undefined) {
        await getEvents();
      }
      if (events.length > events.length) {
        await getEvents();
      }
    }
    getAllEvents();
  }, [address])

  const refetchAll = async () => {
    await getEvents();
    await refetch();
  }

  useEffect(() => {
    if (isSuccess) {
      refetchAll()
      getEvents()
    }
  }, [isSuccess])

  return (
    <div className="flex flex-col items-center ">
      {isConnected ?
        (
          <>
            <RegisterBrand />
            <RegisterClient />
            <section className="w-1/2 space-y-3">
              <h2 className="text-center text-xl">Events</h2>
              <div className="flex flex-col w-full h-96 overflow-auto">
                {events.length > 0 && events.map((event) => {
                  return (
                    <Event event={event} key={crypto.randomUUID()} />
                  )
                })}
              </div>
            </section>
          </>
        ) : (
          <NotConnected />
        )
      }
    </div>
  )
}

export default page