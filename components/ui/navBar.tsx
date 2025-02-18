import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <Link href="/">
        
          <Image src="cropped-srm-trp-logo.png" alt="SRMIST" width={180} height={120} />
      
      </Link>
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="text-blue-800 font-semibold">Home</Link>
        </li>
      </ul>
      <Image src="IIC.png" alt="institute's Innovation Council" width={180} height={120} />
    </nav>
  );
}
