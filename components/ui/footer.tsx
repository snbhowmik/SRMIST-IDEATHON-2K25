import Image from "next/image";

export default function Footer() {
  return (
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
  );
}
