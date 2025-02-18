"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const problemStatementsByDivision: { [key: string]: { id: string; statement: string; group: string }[] } = {
  "01": [
    { id: "1", statement: "Growing of non-perennial crops", group: "011" },
    { id: "2", statement: "Growing of perennial crops", group: "012" },
    { id: "3", statement: "Plant propagation", group: "013" },
    { id: "4", statement: "Animal production", group: "014" },
    { id: "5", statement: "Mixed farming", group: "015" },
    { id: "6", statement: "Support activities to agriculture and post-harvest crop activities", group: "016" },
    { id: "7", statement: "Hunting, trapping and related service activities", group: "017" }
  ],  
  "02": [
    { id: "1", statement: "Silviculture and other forestry activities", group: "021" },
    { id: "2", statement: "Logging", group: "022" },
    { id: "3", statement: "Gathering of non-wood forest products", group: "023" },
    { id: "4", statement: "Support services to forestry", group: "024" }
  ],
  "03": [
    { id: "1", statement: "Fishing", group: "031" },
    { id: "2", statement: "Aquaculture", group: "032"},
  ],
  "05": [
    { id: "1", statement: "Mining of hard coal", group: "051" },
    { id: "2", statement: "Mining of lignite", group: "052" },
  ],
  "06": [
    { id: "1", statement: "Extraction of crude petroleum", group: "061" },
    { id: "2", statement: "Extraction of natural gas", group: "062" },
  ],
  "07": [
    { id: "1", statement: "Mining of iron ores", group: "071" },
    { id: "2", statement: "Mining of non-ferrous metal ores", group: "072" },
  ],
  "08": [
    { id: "1", statement: "Quarrying of stone, sand and clay", group: "081" },
    { id: "2", statement: "Mining and quarrying n.e.c.", group: "089" },
  ],
  "09": [
    { id: "1", statement: "Support activities for petroleum and natural gas extraction", group: "091" },
    { id: "2", statement: "Support activities for other mining and quarrying", group: "099" },
  ],
  "10": [
    { id: "1", statement: "Processing and preserving of meat", group: "101" },
    { id: "2", statement: "Processing and preserving of fish, crustaceans and molluscs", group: "102" },
    { id: "3", statement: "Processing and preserving of fruit and vegetables", group: "103" },
    { id: "4", statement: "Manufacture of vegetable and animal oils and fats", group: "104" },
    { id: "5", statement: "Manufacture of dairy products", group: "105" },
    { id: "6", statement: "Manufacture of grain mill products", group: "106" },
    { id: "7", statement: "Manufacture of starches and starch products", group: "107" },
    { id: "8", statement: "Manufacture of bakery and farinaceous products", group: "108" },
    { id: "9", statement: "Manufacture of other food products", group: "109" },
  ],
  "11": [
    { id: "1", statement: "Manafacturing of Beverage", group: "110" },
  ],
  "12": [
    { id: "1", statement: "Manufacture of tobacco products", group: "120" },
  ],
  "13": [
    { id: "1", statement: "Spinning, weaving and finishing of textiles", group: "131" },
    { id: "2", statement: "Manufacture of other textiles", group: "139" },
  ],
  // Add more problem statements for other divisions...
}

export default function ProblemStatement() {
  const [selectedProblem, setSelectedProblem] = useState("")
  const [problems, setProblems] = useState<{ id: string; statement: string; group: string }[]>([])

  useEffect(() => {
    const division = new URLSearchParams(window.location.search).get("division")
    if (division && problemStatementsByDivision[division]) {
      setProblems(problemStatementsByDivision[division])
    }
  }, [])

  const handleProblemSelect = (problemId: string) => {
    setSelectedProblem(problemId)
  }

  const handleSubmit = () => {
    if (selectedProblem) {
      const domain = new URLSearchParams(window.location.search).get("domain")
      const division = new URLSearchParams(window.location.search).get("division")
      alert(`You've selected problem statement ${selectedProblem} in domain ${domain}, division ${division}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Step 3: Select a Problem Statement</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {problems.map((problem) => (
          <Card
            key={problem.id}
            className={`cursor-pointer transition-all ${selectedProblem === problem.id ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => handleProblemSelect(problem.id)}
          >
            <CardHeader>
              <CardTitle>Problem {problem.id}</CardTitle>
              <CardDescription>Group {problem.group}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{problem.statement}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button onClick={handleSubmit} disabled={!selectedProblem}>
          Submit Selection
        </Button>
      </div>
    </div>
  )
}

