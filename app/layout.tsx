import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SRMIST IDEATHON 2k25",
  description: "Select your domain, division, and problem statement for SRMIST IDEATHON 2k25",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">{children}</main>
      </body>
    </html>
  )
}



import './globals.css'