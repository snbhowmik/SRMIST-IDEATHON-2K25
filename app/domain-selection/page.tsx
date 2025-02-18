"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/ui/navBar"
import Footer from "@/components/ui/footer"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

const domains = [
  { id: "A", name: "Agriculture, forestry and fishing" },
  { id: "B", name: "Mining and quarrying" },
  { id: "C", name: "Manufacturing" },
  { id: "D", name: "Electricity, gas, steam and air conditioning supply" },
  { id: "E", name: "Water supply; sewerage, waste management and remediation activities" },
  { id: "F", name: "Construction" },
  { id: "G", name: "Wholesale and retail trade; repair of motor vehicles and motorcycles" },
  { id: "H", name: "Transportation and storage" },
  { id: "I", name: "Accommodation and Food service activities" },
  { id: "J", name: "Information and communication" },
  { id: "K", name: "Financial and insurance activities" },
  { id: "L", name: "Real estate activities" },
  { id: "M", name: "Professional, scientific and technical activities" },
  { id: "N", name: "Administrative and support service activities" },
  { id: "O", name: "Public administration and defence; compulsory social security" },
  { id: "P", name: "Education" },
  { id: "Q", name: "Human health and social work activities" },
  { id: "R", name: "Arts, entertainment and recreation" },
  { id: "S", name: "Other service activities" },
  {
    id: "T",
    name: "Activities of households as employers; undifferentiated goods- and services-producing activities of households for own use",
  },
  { id: "U", name: "Activities of extraterritorial organizations and bodies" },
]

export default function DomainSelection() {
  const [selectedDomain, setSelectedDomain] = useState("")
  const router = useRouter()

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId)
  }

  const handleNext = () => {
    if (selectedDomain) {
      router.push(`/division-selection?domain=${selectedDomain}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <NavBar />

      <main className="flex flex-col items-center justify-center flex-grow mt-20 px-4 py-20">
        <h1 className="text-3xl font-bold mb-6 text-center">Step 1: Select a Domain</h1>
        {domains.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.map((domain) => (
              <Card
                key={domain.id}
                className={`cursor-pointer transition-all ${
                  selectedDomain === domain.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handleDomainSelect(domain.id)}
              >
                <CardHeader>
                  <CardTitle>{domain.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <p>No domains available.</p>
        )}
        <div className="mt-8 flex justify-center">
          <Button onClick={handleNext} disabled={!selectedDomain}>
            Next: Select Division
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}