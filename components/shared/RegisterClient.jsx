// config
'use client'
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractMarketplaceAddress, contractMarketplaceAbi } from "@/constants";

// components
import Informations from "./Information";

// UI
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button"
import { useToast } from "../ui/use-toast";


const RegisterClient = () => {
  const [clientAddress, setClientAddress] = useState("")
  const { toast } = useToast();

  const { address } = useAccount();
  const { data: hash, isPending: setIsPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: errorConfirmation, refetch } = useWaitForTransactionReceipt({ hash })

  const handleRegister = async () => {

    // check valid input before transaction
    if (clientAddress.length !== 42) {
      toast({
        title: "Error",
        description: "Address should have 42 characters",
        className: 'bg-none rounded-none border-red-600 text-red-600'
      });
    } else if (clientAddress[0] !== 0 && clientAddress[1] !== 'x') {
      toast({
        title: "Error",
        description: "Address should start by 0x",
        className: 'bg-none rounded-none border-red-600 text-red-600'
      });
    } else {
      try {
        await writeContract({
          address: contractMarketplaceAddress,
          abi: contractMarketplaceAbi,
          functionName: 'registerClient',
          args: [clientAddress],
        })
      } catch (error) {
        console.error(error);
      }
    }
  }

  // refrech all inputs after transaction
  useEffect(() => {
    if (isConfirmed) {
      setClientAddress('')
      refetch();
    }
  }, [isConfirmed, refetch])

  return (
    <section className="w-1/2 mb-10">
      <h2 className="text-center text-xl">Register new client</h2>
      <div>
        <Label htmlFor="clientAddress">Client address</Label>
        <Input type="text" placeholder="ex: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} maxLength={42} />
      </div>
      <div className="flex justify-end">
        <Button variant="outline" className="rounded-none bg-[#D4AF37] text-white shadow-md mt-3" onClick={handleRegister}>{setIsPending ? 'Registering...' : 'Register'}</Button>
      </div>
      <Informations hash={hash} isConfirming={isConfirming} isConfirmed={isConfirmed} error={error} />
    </section>

  )
}

export default RegisterClient