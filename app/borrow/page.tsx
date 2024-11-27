import Image from "next/image";
import Navbar from "@/components/navbar";
import Borrow from "@/components/borrow";

export default function Home() {
  return (
   <div>
    <Navbar />
    <Borrow />
   </div>
  );
}
