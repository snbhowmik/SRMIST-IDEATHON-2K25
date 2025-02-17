"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const problemStatementsByDivision: { [key: string]: { id: string; statement: string; group: string }[] } = {
  "01": [
    {
      id: "1",
      statement: "Develop a smart irrigation system for sustainable water management in agriculture",
      group: "011",
    },
    { id: "2", statement: "Create an AI-powered pest detection and management system for crops", group: "011" },
    { id: "3", statement: "Design a precision livestock monitoring system for improved animal welfare", group: "014" },
  ],
  "02": [
    { id: "1", statement: "Develop a sustainable logging practice using drone technology", group: "022" },
    { id: "2", statement: "Create an AI-powered system for early detection of forest fires", group: "021" },
    { id: "3", statement: "Design a blockchain-based system for tracking sustainable forestry products", group: "024" },
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

