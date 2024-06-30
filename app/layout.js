import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import RainbowKitAndWagmiProvider from "./rainbowKitandWagmiProvider"

import Layout from "@/components/shared/Layout"
// import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Luxau - Lifestyle Elegance",
  description: "Decentralized NFT Marketplace for luxury brands",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <RainbowKitAndWagmiProvider>
          <Layout>
            {children}
          </Layout>
        </RainbowKitAndWagmiProvider>
        {/* <Toaster /> */}
      </body>
    </html>
  )
}