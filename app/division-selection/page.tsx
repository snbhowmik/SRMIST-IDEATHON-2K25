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
  C: [
    { id: "10", name: "Manufacture of food products" },
    { id: "11", name: "Manufacture of beverages" },
    { id: "12", name: "Manufacture of tobacco products" },
    { id: "13", name: "Manufacture of textiles" },
    { id: "14", name: "Manufacture of wearing apparel" },
    { id: "15", name: "Manufacture of leather and related products" },
    { id: "16", name: "Manufacture of wood and of products of wood and cork, except furniture; manufacture of articles of straw and plaiting materials" },
    { id: "17", name: "Manufacture of paper and paper products" },
    { id: "18", name: "Printing and reproduction of recorded media" },
    { id: "19", name: "Manufacture of coke and refined petroleum products" },
    { id: "20", name: "Manufacture of chemicals and chemical products" },
    { id: "21", name: "Manufacture of basic pharmaceutical products and pharmaceutical preparations" },
    { id: "22", name: "Manufacture of rubber and plastic products" },
    { id: "23", name: "Manufacture of other non-metallic mineral products" },
    { id: "24", name: "Manufacture of basic metals" },
    { id: "25", name: "Manufacture of fabricated metal products, except machinery and equipment" },
    { id: "26", name: "Manufacture of computer, electronic and optical products" },
    { id: "27", name: "Manufacture of electrical equipment" },
    { id: "28", name: "Manufacture of machinery and equipment n.e.c." },
    { id: "29", name: "Manufacture of motor vehicles, trailers and semi-trailers" },
    { id: "30", name: "Manufacture of other transport equipment" },
    { id: "31", name: "Manufacture of furniture" },
    { id: "32", name: "Other manufacturing" },
    { id: "33", name: "Repair and installation of machinery and equipment" },
  ],
  D: [
    { id: "35", name: "Electric, gas, steam and air conditioning supply" },
  ],
  E: [
    { id: "36", name: "Water collection, treatment and supply" },
    { id: "37", name: "Sewerage" },
    { id: "38", name: "Waste collection, treatment and disposal activities; materials recovery" },
    { id: "39", name: "Remediation activities and other waste management services" },
  ],  
  F: [
    { id: "41", name: "Construction of buildings" },
    { id: "42", name: "Civil engineering" },
    { id: "43", name: "Specialized construction activities" },
  ],
  G: [
    { id: "45", name: "Wholesale and retail trade and repair of motor vehicles and motorcycles" },
    { id: "46", name: "Wholesale trade, except of motor vehicles and motorcycles" },
    { id: "47", name: "Retail trade, except of motor vehicles and motorcycles" },
  ],
  H: [
    { id: "49", name: "Land transport and transport via pipelines" },
    { id: "50", name: "Water transport" },
    { id: "51", name: "Air transport" },
    { id: "52", name: "Warehousing and support activities for transportation" },
    { id: "53", name: "Postal and courier activities" },
  ],
  I: [
    { id: "55", name: "Accommodation" },
    { id: "56", name: "Food and beverage service activities" },
  ],
  J: [
    { id: "58", name: "Publishing activities" },
    { id: "59", name: "Motion picture, video and television programme production, sound recording and music publishing activities" },
    { id: "60", name: "Programming and broadcasting activities" },
    { id: "61", name: "Telecommunications" },
    { id: "62", name: "Computer programming, consultancy and related activities" },
    { id: "63", name: "Information service activities" },
  ],
  K: [
    { id: "64", name: "Financial service activities, except insurance and pension funding" },
    { id: "65", name: "Insurance, reinsurance and pension funding, except compulsory social security" },
    { id: "66", name: "Other financial activities" },
  ],
  L: [
    { id: "68", name: "Real estate activities" },
  ],
  M: [
    { id: "69", name: "Legal and accounting activities" },
    { id: "70", name: "Activities of head offices; management consultancy activities" },
    { id: "71", name: "Architectural and engineering activities; technical testing and analysis" },
    { id: "72", name: "Scientific research and development" },
    { id: "73", name: "Advertising and market research" },
    { id: "74", name: "Other professional, scientific and technical activities" },
    { id: "75", name: "Veterinary activities" },
  ],
  N: [
    { id: "77", name: "Rental and leasing activities" },
    { id: "78", name: "Employment activities" },
    { id: "79", name: "Travel agency, tour operator and other reservation service and related activities" },
    { id: "80", name: "Security and investigation activities" },
    { id: "81", name: "Services to buildings and landscape activities" },
    { id: "82", name: "Office administrative, office support and other business support activities" },
  ],
  O: [
    { id: "84", name: "Public administration and defence; compulsory social security" },
  ],
  P: [
    { id: "85", name: "Education" },
  ],
  Q: [
    { id: "86", name: "Human health activities" },
    { id: "87", name: "Residential care activities" },
    { id: "88", name: "Social work activities without accommodation" },
  ],
  R: [
    { id: "90", name: "Creative, arts and entertainment activities" },
    { id: "91", name: "Libraries, archives, museums and other cultural activities" },
    { id: "92", name: "Gambling and betting activities" },
    { id: "93", name: "Sports activities and amusement and recreation activities" },
  ],
  S: [
    { id: "94", name: "Activities of membership organizations" },
    { id: "95", name: "Repair of computers and personal and household goods" },
    { id: "96", name: "Other personal service activities" },
  ],
  T: [
    { id: "97", name: "Activities of households as employers of domestic personnel" },
    { id: "98", name: "Undifferentiated goods- and services-producing activities of private households for own use" },
  ],
  U: [
    { id: "99", name: "Activities of extraterritorial organizations and bodies" },
  ]
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

