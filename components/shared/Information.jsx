// config
'use client'
import { useEffect, useState } from "react";

// UI
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useToast } from "../ui/use-toast"

const Informations = ({ hash, isConfirming, error, isConfirmed }) => {

  const [showHash, setShowHash] = useState(false);
  const [showConfirming, setShowConfirming] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);

  useEffect(() => {
    if (hash) {
      setShowHash(true);
      const timer = setTimeout(() => setShowHash(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  useEffect(() => {
    if (isConfirming) {
      setShowConfirming(true);
      const timer = setTimeout(() => setShowConfirming(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isConfirming]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (isConfirmed) {
      setShowConfirmed(true);
      const timer = setTimeout(() => setShowConfirmed(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed]);

  return (
    <div className="absolute bottom-0 right-2">
      {showHash &&
        <Alert className="rounded-none border-blue-400 text-blue-500 mb-2" >
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Transaction Hash: {hash}.
          </AlertDescription>
        </Alert>
      }
      {showConfirming &&
        <Alert className="bg-none rounded-none border-orange-400 text-orange-400 mb-2">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Waiting for confirmation...
          </AlertDescription>
        </Alert>
      }
      {showError && (
        <Alert className="bg-none rounded-none border-red-600 text-red-600 mb-2">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Error: {(error).shortMessage || error.message}
          </AlertDescription>
        </Alert>
      )}
      {showConfirmed &&
        <Alert className="rounded-none border-lime-500 text-lime-500 mb-2">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            The transaction has been confirmed.
          </AlertDescription>
        </Alert>
      }
    </div>
  )
}

export default Informations