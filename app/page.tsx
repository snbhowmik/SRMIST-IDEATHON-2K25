import Navbar from "@/components/ui/navBar";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Navbar />
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow mt-20">
        <h1 className="text-4xl font-bold mb-8 text-blue-800">Welcome to SRMIST INNOVATE'25</h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          Embark on your innovation journey by selecting a domain, division, and problem statement.
        </p>
        <Link href="/domain-selection">
          <Button size="lg">Start Your Journey</Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
