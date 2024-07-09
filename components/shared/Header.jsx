'use client'
// config
import Link from "next/link"
import { useEffect, useState } from "react"
// import { useAdmin } from "../../providers/AdminContext";

// UI
import { navigationMenuTriggerStyle, NavigationMenuItem, NavigationMenuLink, NavigationMenu } from "@/components/ui/navigation-menu"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const Header = () => {
  // const { isAdmin } = useAdmin();

  return (
    <header className="shadow-md">
      <div className="flex justify-between h-28">
        <div className="w-full items-center justify-center flex">
          <h1 className="text-5xl">L<span className="text-[#D4AF37]">U</span>XAU - <span className="italic font-light">LIFESTYLE ELEGANCE</span></h1>
        </div>
        <div className="absolute top-1 right-1">
          <ConnectButton label="Sign in" accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }} chainStatus="none" showBalance={false} />
        </div>
      </div>
      <div className="flex justify-center space-x-3 text-zinc-400 w-full">
        <NavigationMenu>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
            <Link href="/admin" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Admin
              </NavigationMenuLink>
            </Link>
            {/* {isAdmin && (
              <Link href="/admin" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Admin
                </NavigationMenuLink>
              </Link>
            )} */}
            <Link href="/create-nft" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Create NFT
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </header>
  );
}

export default Header;
