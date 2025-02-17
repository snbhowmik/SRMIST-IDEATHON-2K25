"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const divisionsByDomain: { [key: string]: { id: string; name: string }[] } = {
  A: [
    { id: "01", name: "Crop and animal production, hunting and related service activities" },
    { id: "02", name: "Forestry and logging" },
    { id: "03", name: "Fishing and aquaculture" },
  ],
  B: [
    { id: "05", name: "Mining of coal and lignite" },
    { id: "06", name: "Extraction of crude petroleum and natural gas" },
    { id: "07", name: "Mining of metal ores" },
    { id: "08", name: "Other mining and quarrying" },
    { id: "09", name: "Mining support service activities" },
  ],
  // Add more divisions for other domains...
}

export default function DivisionSelection() {
  const [selectedDivision, setSelectedDivision] = useState("")
  const [divisions, setDivisions] = useState<{ id: string; name: string }[]>([])
  const router = useRouter()

  useEffect(() => {
    const domain = new URLSearchParams(window.location.search).get("domain")
    if (domain && divisionsByDomain[domain]) {
      setDivisions(divisionsByDomain[domain])
    }
  }, [])

  const handleDivisionSelect = (divisionId: string) => {
    setSelectedDivision(divisionId)
  }

  const handleNext = () => {
    if (selectedDivision) {
      const domain = new URLSearchParams(window.location.search).get("domain")
      router.push(`/problem-statement?domain=${domain}&division=${selectedDivision}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Step 2: Select a Division</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {divisions.map((division) => (
          <Card
            key={division.id}
            className={`cursor-pointer transition-all ${selectedDivision === division.id ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => handleDivisionSelect(division.id)}
          >
            <CardHeader>
              <CardTitle>{division.name}</CardTitle>
              <CardDescription>Division {division.id}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button onClick={handleNext} disabled={!selectedDivision}>
          Next: View Problem Statements
        </Button>
      </div>
    </div>
  )
}

