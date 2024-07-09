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

// event BrandRegistered(address brandAddress);
// event ClientRegistered(address clientAddress);
// event NFTCreated(address brandAddress, uint256 tokenId, uint256 price, string description);
// event NFTSold(address from, address to, uint256 id, uint256 price);


const page = () => {
  const [events, setEvents] = useState([])
  const { isConnected, address } = useAccount();
  const { data: hash, isSuccess, refetch } = useReadContract({
    address: contractMarketplaceAddress,
    abi: contractMarketplaceAbi,
    functionName: "owner"
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
              <div className="flex flex-col w-full">
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