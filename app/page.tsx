import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <Image src="cropped-srm-trp-logo.png" alt="Logo 1" width={150} height={100} />
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-blue-800 font-semibold">Home</Link>
          </li>
        </ul>
        <Image src="IIC.png" alt="Logo 2" width={120} height={80} />
      </nav>
      
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow mt-20">
        <h1 className="text-4xl font-bold mb-8 text-blue-800">Welcome to SRMIST IDEATHON 2k25</h1>
        <h1 className="text-4xl font-bold mb-8 text-blue-800">Session-1</h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          Embark on your innovation journey by selecting a domain, division, and problem statement.
        </p>
        <Link href="/domain-selection">
          <Button size="lg">Start Your Journey</Button>
        </Link>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-4 px-6 bg-gray-900 text-white flex justify-between items-center mt-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Powered by</span>
          <Image 
            src="cyberanzen.png" 
            alt="Logo" 
            width={170} 
            height={80} 
            className="h-auto"
          />
        </div>
      </footer>
    </div>
  );
}