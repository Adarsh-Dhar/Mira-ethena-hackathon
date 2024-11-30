
// components/Navbar.tsx
"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { connectWallet } from "./connectWallet";
import { borrow } from "@/interaction";



const Navbar: React.FC = () => {
  return (

<nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-white font-bold text-xl">
            EuLend
          </Link>
        <div className="flex space-x-4">
            <Button asChild>
            <Link href="/borrow">Borrow</Link>
            </Button>
            <Button asChild>
            <Link href="/lend">Lend</Link>
            </Button>
            <Button onClick={ async () => {
                console.log("hi")
                const state = await connectWallet()
                const borrowTx : any = await borrow(10,2)
                console.log("borrow tx",borrowTx)
                console.log(state)
                console.log("yo")
            }
            }>connect wallet</Button>
         
        </div>
      </div>
    </nav>

    
  );
};

export default Navbar;