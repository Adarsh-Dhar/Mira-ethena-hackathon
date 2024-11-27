
// components/Navbar.tsx
"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button"



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
            <Button onClick={ () => {
                console.log("button clicked")
            }
            }>connect wallet</Button>
         
        </div>
      </div>
    </nav>

    
  );
};

export default Navbar;