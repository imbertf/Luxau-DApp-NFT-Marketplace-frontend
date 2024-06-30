// config
import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

// UI
import { navigationMenuTriggerStyle, NavigationMenuItem, NavigationMenuLink, NavigationMenu } from "@/components/ui/navigation-menu"


const Header = () => {
  return (
    <header className=" shadow-md">
      <div className="flex justify-between h-28">
        <div className="w-full items-center justify-center flex ">
          <h1 className="text-5xl">L<span className="text-[#D4AF37]">U</span>XAU - <span className="italic font-light">LIFESTYLE ELEGANCE</span></h1>
        </div>
        <div className="absolute top-1 right-1">
          <ConnectButton label="Sign in" accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }} chainStatus="none" showBalance={false} />
        </div>
      </div>
      <div className="flex justify-center space-x-3 text-zinc-400 w-full ">
        <NavigationMenu>
          <NavigationMenuItem>
            <Link href="/nft" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                NFTs
              </NavigationMenuLink>
            </Link>
            <Link href="/brands" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Brands
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </header>
  )
}

export default Header