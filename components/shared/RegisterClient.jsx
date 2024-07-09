// config
'use client'
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { contractMarketplaceAddress, contractMarketplaceAbi } from "@/constants";
import { parseAbiItem } from "viem";
import { publicClient } from "@/utils/client";

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

  const handleRegister = async () => {
    try {
      await writeContract({
        address: contractMarketplaceAddress,
        abi: contractMarketplaceAbi,
        functionName: 'registerClient',
        args: [clientAddress],
      })
      setClientAddress('')
    } catch (error) {
      console.error(error);
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed, error: errorConfirmation } = useWaitForTransactionReceipt({ hash })

  return (
    <section className="w-1/2 mb-10">
      <h2 className="text-center text-xl">Register new client</h2>
      <div>
        <Label htmlFor="clientAddress">Client address</Label>
        <Input type="text" placeholder="ex: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" onChange={(e) => setClientAddress(e.target.value)} maxLength={42} />
      </div>
      <div className="flex justify-end">
        <Button variant="outline" className="rounded-none bg-[#D4AF37] text-white shadow-md mt-3" onClick={handleRegister}>{setIsPending ? 'Registering...' : 'Register'}</Button>
      </div>
    </section>

  )
}

export default RegisterClient