import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const NotConnected = () => {
  return (
    <Alert className="flex justify-center border-none">
      <AlertDescription className="w-1/4 flex flex-col items-center justify-center border-2 border-[#D4AF37] shadow-md h-20">
        <p>Please connect to <span className="text-[#D4AF37] font-bold">Luxau </span>Marketplace with your wallet</p>
      </AlertDescription>
    </Alert>
  )
}

export default NotConnected