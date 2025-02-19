"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/ui/navBar"
import Footer from "@/components/ui/footer"
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
  "14": [
    { id: "1", statement: "Manufacture of wearing apparel, except fur apparel", group: "141" },
    { id: "2", statement: "Manufacture of articles of fur", group: "142" },
    { id: "3", statement: "Manufacture of knitted and crocheted apparel", group: "143" },
  ],
  "15": [
    { id: "1", statement: "Tanning and dressing of leather; manufacture of luggage, handbags, saddlery and harness; dressing and dyeing of fur", group: "151" },
    { id: "2", statement: "Manufacture of footwear", group: "152" },
  ],
  "16": [
    { id: "1", statement: "Sawmilling and planing of wood", group: "161" },
    { id: "2", statement: "Manufacture of products of wood, cork, straw and plaiting materials", group: "162" },
  ],
  "17": [
    { id: "1", statement: "Manufacture of paper and paper products", group: "170" },
  ],
  "18": [
    { id: "1", statement: "Printing and service activities related to printing", group: "181" },
    { id: "2", statement: "Reproduction of Recorded Media", group: "182" },
  ],
  "19": [
    { id: "1", statement: "Manufacture of coke oven products", group: "191" },
    { id: "2", statement: "Manufacture of refined petroleum products", group: "192" },
  ],
  "20": [
    { id: "1", statement: "Manufacture of basic chemicals, fertilizer and nitrogen compounds, plastics and synthetic rubber in primary forms", group: "201" },
    { id: "2", statement: "Manufacture of other chemical products", group: "202" },
    { id: "3", statement: "Manufacture of man-made fibres", group: "203" },
  ],
  "21": [
    { id: "1", statement: "Manufacture of pharmaceuticals, medicinal chemical and botanical products", group: "210" },
  ],
  "22": [
    { id: "1", statement: "Manufacture of rubber products", group: "221" },
    { id: "2", statement: "Manufacture of plastics products", group: "222" },
  ],
  "23": [
    { id: "1", statement: "Manufacture of glass and glass products", group: "231" },
    { id: "8", statement: "Manufacture of other non-metallic mineral products", group: "239" },
  ],
  "24": [
    { id: "1", statement: "Manufacture of basic iron and steel", group: "241" },
    { id: "2", statement: "Manufacture of basic precious and other non-ferrous metals", group: "242" },
    { id: "3", statement: "Casting of metals", group: "243" },
  ],
  "25": [
    { id: "1", statement: "Manufacture of structural metal products", group: "251" },
    { id: "2", statement: "Manufacture of tanks, reservoirs and containers of metal", group: "252" },
    { id: "3", statement: "Manufacture of steam generators, except central heating hot water boilers", group: "253" },
    { id: "4", statement: "Manufacture of weapons and ammunition", group: "254" },
    { id: "5", statement: "Forging, pressing, stamping and roll-forming of metal; powder metallurgy", group: "255" },
    { id: "6", statement: "Treatment and coating of metals; machining", group: "256" },
    { id: "7", statement: "Manufacture of cutlery, hand tools and general hardware", group: "257" },
    { id: "8", statement: "Manufacture of other fabricated metal products", group: "259" },
  ],
  "26": [
    { id: "1", statement: "Manufacture of electronic components and boards", group: "261" },
    { id: "2", statement: "Manufacture of computers and peripheral equipment", group: "262" },
    { id: "3", statement: "Manufacture of communication equipment", group: "263" },
    { id: "4", statement: "Manufacture of consumer electronics", group: "264" },
    { id: "5", statement: "Manufacture of measuring, testing, navigating and control equipment; watches and clocks", group: "265" },
    { id: "6", statement: "Manufacture of irradiation, electromedical and electrotherapeutic equipment", group: "266" },
    { id: "6", statement: "Manufacture of optical instruments and equipment", group: "267" },
    { id: "6", statement: "Manufacture of magnetic and optical media", group: "268" },
  ],
  "27": [
    { id: "1", statement: "Manufacture of electric motors, generators, transformers and electricity distribution and control apparatus", group: "271" },
    { id: "2", statement: "Manufacture of batteries and accumulators", group: "272" },
    { id: "3", statement: "Manufacture of wiring and wiring devices", group: "273" },
    { id: "4", statement: "Manufacture of electric lighting equipment", group: "274" },
    { id: "5", statement: "Manufacture of domestic appliances", group: "275" },
    { id: "6", statement: "Manufacture of other electrical equipment", group: "279" },
  ],
  "28": [
    { id: "1", statement: "Manufacture of general purpose machinery", group: "281" },
    { id: "2", statement: "Manufacture of special-purpose machinery", group: "282" },
  ],
  "29": [
    { id: "1", statement: "Manufacture of motor vehicles", group: "291" },
    { id: "2", statement: "Manufacture of bodies (coachwork) for motor vehicles; manufacture of trailers and semi-trailers", group: "292" },
    { id: "3", statement: "Manufacture of parts and accessories for motor vehicles", group: "293" },
  ],
  "30": [
    { id: "1", statement: "Building of ships and boats", group: "301" },
    { id: "2", statement: "Manufacture of railway locomotives and rolling stock", group: "302" },
    { id: "3", statement: "Manufacture of air and spacecraft and related machinery", group: "303" },
    { id: "4", statement: "Manufacture of military fighting vehicles", group: "304" },
    { id: "5", statement: "Manufacture of transport equipment n.e.c.", group: "309" }
  ],
  "31": [
    { id: "1", statement: "Manufacture of furniture", group: "310" }
  ],
  "32": [
    { id: "1", statement: "Manufacture of jewellery, bijouterie and related articles", group: "321" },
    { id: "2", statement: "Manufacture of musical instruments", group: "322" },
    { id: "3", statement: "Manufacture of sports goods", group: "323" },
    { id: "4", statement: "Manufacture of games and toys", group: "324" },
    { id: "5", statement: "Manufacture of medical and dental instruments and supplies", group: "325" },
    { id: "6", statement: "Other manufacturing n.e.c.", group: "329" }
  ],
  "33": [
    { id: "1", statement: "Repair of fabricated metal products, machinery and equipment", group: "331" },
    { id: "2", statement: "Installation of industrial machinery and equipment", group: "332" }
  ],
  "35": [
    { id: "1", statement: "Electric power generation, transmission and distribution", group: "351" },
    { id: "2", statement: "Manufacture of gas; distribution of gaseous fuels through mains", group: "352" },
    { id: "3", statement: "Steam and air conditioning supply", group: "353" }
  ],
  "36": [
    { id: "1", statement: "Water collection, treatment and supply", group: "360" }
  ],
  "37": [
    { id: "1", statement: "Sewerage", group: "370" }
  ],
  "38": [
    { id: "1", statement: "Waste collection", group: "381" },
    { id: "2", statement: "Waste treatment and disposal", group: "382" },
    { id: "3", statement: "Materials recovery", group: "383" }
  ],
  "39": [
    { id: "1", statement: "Remediation activities and other waste management services", group: "390" }
  ],
  "41": [
    { id: "1", statement: "Construction of buildings", group: "410" }
  ],
  "42": [
    { id: "1", statement: "Construction of roads and railways", group: "421" },
    { id: "2", statement: "Construction of utility projects", group: "422" },
    { id: "3", statement: "Construction of other civil engineering projects", group: "429" }
  ],
  "43": [
    { id: "1", statement: "Demolition and site preparation", group: "431" },
    { id: "2", statement: "Electrical, plumbing and other construction installation activities", group: "432" },
    { id: "3", statement: "Building completion and finishing", group: "433" },
    { id: "4", statement: "Other specialized construction activities", group: "439" }
  ],
  "45": [
    { id: "1", statement: "Sale of motor vehicles", group: "451" },
    { id: "2", statement: "Maintenance and repair of motor vehicles", group: "452" },
    { id: "3", statement: "Sale of motor vehicle parts and accessories", group: "453" },
    { id: "4", statement: "Sale, maintenance and repair of motorcycles and related parts and accessories", group: "454" }
  ],
  "46": [
    { id: "1", statement: "Wholesale on a fee or contract basis", group: "461" },
    { id: "2", statement: "Wholesale of agricultural raw materials and live animals", group: "462" },
    { id: "3", statement: "Wholesale of food, beverages and tobacco", group: "463" },
    { id: "4", statement: "Wholesale of household goods", group: "464" },
    { id: "5", statement: "Wholesale of machinery, equipment and supplies", group: "465" },
    { id: "6", statement: "Other specialized wholesale", group: "466" },
    { id: "7", statement: "Non-specialized wholesale trade", group: "469" }
  ],
  "47": [
    { id: "1", statement: "Retail sale in non-specialized stores", group: "471" },
    { id: "2", statement: "Retail sale of food, beverages and tobacco in specialized stores", group: "472" },
    { id: "3", statement: "Retail sale of automotive fuel in specialized stores", group: "473" },
    { id: "4", statement: "Retail sale of information and communications equipment in specialized stores", group: "474" },
    { id: "5", statement: "Retail sale of other household equipment in specialized stores", group: "475" },
    { id: "6", statement: "Retail sale of cultural and recreation goods in specialized stores", group: "476" },
    { id: "7", statement: "Retail sale of other goods in specialized stores", group: "477" },
    { id: "8", statement: "Retail sale via stalls and markets", group: "478" },
    { id: "9", statement: "Retail trade not in stores, stalls or markets", group: "479" }
  ],
  "49": [
    { id: "1", statement: "Transport via railways", group: "491" },
    { id: "2", statement: "Other land transport", group: "492" },
    { id: "3", statement: "Transport via pipeline", group: "493" }
  ],
  "50": [
    { id: "1", statement: "Sea and coastal water transport", group: "501" },
    { id: "2", statement: "Inland water transport", group: "502" }
  ],
  "51": [
{ id: "1", statement: "Passenger air transport", group: "511" },
{ id: "2", statement: "Freight air transport", group: "512" }
],
"52": [
{ id: "1", statement: "Warehousing and storage", group: "521" },
{ id: "2", statement: "Support activities for transportation", group: "522" }
],
"53": [
{ id: "1", statement: "Postal activities", group: "531" },
{ id: "2", statement: "Courier activities", group: "532" }
],
"55": [
{ id: "1", statement: "Short term accommodation activities", group: "551" },
{ id: "2", statement: "Camping grounds, recreational vehicle parks and trailer parks", group: "552" },
{ id: "3", statement: "Other accommodation", group: "559" }
],
"56": [
{ id: "1", statement: "Restaurants and mobile food service activities", group: "561" },
{ id: "2", statement: "Event catering and other food service activities", group: "562" },
{ id: "3", statement: "Beverage serving activities", group: "563" }
],
"58": [
{ id: "1", statement: "Publishing of books, periodicals and other publishing activities", group: "581" },
{ id: "2", statement: "Software publishing", group: "582" }
],
"59": [
{ id: "1", statement: "Motion picture, video and television programme activities", group: "591" },
{ id: "2", statement: "Sound recording and music publishing activities", group: "592" }
],
"60": [
{ id: "1", statement: "Radio broadcasting", group: "601" },
{ id: "2", statement: "Television programming and broadcasting activities", group: "602" }
],
"61": [
{ id: "1", statement: "Wired telecommunications activities", group: "611" },
{ id: "2", statement: "Wireless telecommunications activities", group: "612" },
{ id: "3", statement: "Satellite telecommunications activities", group: "613" },
{ id: "4", statement: "Other telecommunications activities", group: "619" }
],
"62": [
{ id: "1", statement: "Computer programming, consultancy and related activities", group: "620" }
],
"63": [
{ id: "1", statement: "Data processing, hosting and related activities; web portals", group: "631" },
{ id: "2", statement: "Other information service activities", group: "639" }
],
"64": [
{ id: "1", statement: "Monetary intermediation", group: "641" },
{ id: "2", statement: "Activities of holding companies", group: "642" },
{ id: "3", statement: "Trusts, funds and other financial vehicles", group: "643" },
{ id: "4", statement: "Other financial service activities, except insurance and pension funding activities", group: "649" }
],
"65": [
{ id: "1", statement: "Insurance", group: "651" },
{ id: "2", statement: "Reinsurance", group: "652" },
{ id: "3", statement: "Pension funding", group: "653" }
],
"66": [
{ id: "1", statement: "Activities auxiliary to financial service activities, except insurance and pension funding", group: "661" },
{ id: "2", statement: "Activities auxiliary to insurance and pension funding", group: "662" },
{ id: "3", statement: "Fund management activities", group: "663" }
],
"68": [
{ id: "1", statement: "Real estate activities with own or leased property", group: "681" },
{ id: "2", statement: "Real estate activities on a fee or contract basis", group: "682" }
],
"69": [
{ id: "1", statement: "Legal activities", group: "691" },
{ id: "2", statement: "Accounting, bookkeeping and auditing activities; tax consultancy", group: "692" }
],
"70": [
{ id: "1", statement: "Activities of head offices", group: "701" },
{ id: "2", statement: "Management consultancy activities", group: "702" }
],
"71": [
{ id: "1", statement: "Architectural and engineering activities and related technical consultancy", group: "711" },
{ id: "2", statement: "Technical testing and analysis", group: "712" }
],
"72": [
{ id: "1", statement: "Research and experimental development on natural sciences and engineering", group: "721" },
{ id: "2", statement: "Research and experimental development on social sciences and humanities", group: "722" }
],
"73": [
{ id: "1", statement: "Advertising", group: "731" },
{ id: "2", statement: "Market research and public opinion polling", group: "732" }
],
"74": [
{ id: "1", statement: "Specialized design activities", group: "741" },
{ id: "2", statement: "Photographic activities", group: "742" },
{ id: "3", statement: "Other professional, scientific and technical activities n.e.c.", group: "749" }
],
"75": [
{ id: "1", statement: "Veterinary activities", group: "750" }
],
"77": [
{ id: "1", statement: "Renting and leasing of motor vehicles", group: "771" },
{ id: "2", statement: "Renting and leasing of personal and household goods", group: "772" },
{ id: "3", statement: "Renting and leasing of other machinery, equipment and tangible goods", group: "773" },
{ id: "4", statement: "Leasing of intellectual property and similar products, except copyrighted works", group: "774" }
],
"78": [
{ id: "1", statement: "Activities of employment placement agencies", group: "781" },
{ id: "2", statement: "Temporary employment agency activities", group: "782" },
{ id: "3", statement: "Other human resources provision", group: "783" }
],
"79": [
{ id: "1", statement: "Travel agency and tour operator activities", group: "791" },
{ id: "2", statement: "Other reservation service and related activities", group: "799" }
],
"80": [
{ id: "1", statement: "Private security activities", group: "801" },
{ id: "2", statement: "Security systems service activities", group: "802" },
{ id: "3", statement: "Investigation activities", group: "803" }
],
"81": [
{ id: "1", statement: "Combined facilities support activities", group: "811" },
{ id: "2", statement: "Cleaning activities", group: "812" },
{ id: "3", statement: "Landscape care and maintenance service activities", group: "813" }
],
"82": [
{ id: "1", statement: "Office administrative and support activities", group: "821" },
{ id: "2", statement: "Activities of call centres", group: "822" },
{ id: "3", statement: "Organization of conventions and trade shows", group: "823" },
{ id: "4", statement: "Business support service activities n.e.c.", group: "829" }
],
"84": [
{ id: "1", statement: "Administration of the State and the economic and social policy of the community", group: "841" },
{ id: "2", statement: "Provision of services to the community as a whole", group: "842" },
{ id: "3", statement: "Compulsory social security activities", group: "843" }
],
"85": [
{ id: "1", statement: "Pre-primary and primary education", group: "851" },
{ id: "2", statement: "Secondary education", group: "852" },
{ id: "3", statement: "Higher education", group: "853" },
{ id: "4", statement: "Other education", group: "854" },
{ id: "5", statement: "Educational support activities", group: "855" }
],
"86": [
{ id: "1", statement: "Hospital activities", group: "861" },
{ id: "2", statement: "Medical and dental practice activities", group: "862" },
{ id: "3", statement: "Other human health activities", group: "869" }
],
"87": [
{ id: "1", statement: "Residential nursing care facilities", group: "871" },
{ id: "2", statement: "Residential care activities for mental retardation, mental health and substance abuse", group: "872" },
{ id: "3", statement: "Residential care activities for the elderly and disabled", group: "873" },
{ id: "4", statement: "Other residential care activities", group: "879" }
],
"88": [
{ id: "1", statement: "Social work activities without accommodation for the elderly and disabled", group: "881" },
{ id: "2", statement: "Other social work activities without accommodation", group: "889" }
],
"90": [
{ id: "1", statement: "Creative, arts and entertainment activities", group: "900" }
],
"91": [
{ id: "1", statement: "Library and archives activities", group: "910" }
],
"92": [
{ id: "1", statement: "Gambling and betting activities", group: "920" }
],
"93": [
{ id: "1", statement: "Sports activities", group: "931" },
{ id: "2", statement: "Other amusement and recreation activities", group: "932" }
],
"94": [
{ id: "1", statement: "Activities of business, employers and professional membership organizations", group: "941" },
{ id: "2", statement: "Activities of trade unions", group: "942" },
{ id: "3", statement: "Activities of other membership organizations", group: "949" }
],
"95": [
{ id: "1", statement: "Repair of computers and communication equipment", group: "951" },
{ id: "2", statement: "Repair of personal and household goods", group: "952" }
],
"96": [
{ id: "1", statement: "Other personal service activities", group: "960" }
],
"97": [
{ id: "1", statement: "Activities of households as employers of domestic personnel", group: "970" }
],
"98": [
{ id: "1", statement: "Undifferentiated goods-producing activities of private households for own use", group: "981" },
{ id: "2", statement: "Undifferentiated service-producing activities of private households for own use", group: "982" }
],
"99": [
{ id: "1", statement: "Activities of extraterritorial organizations and bodies", group: "990" }
]
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <NavBar />
      
      <main className="flex flex-col items-center justify-center flex-grow mt-20 px-4 py-20">
        <h1 className="text-3xl font-bold mb-6 text-center">Step 3: Select a Problem Statement</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem) => (
            <Card
              key={problem.id}
              className={`cursor-pointer transition-all ${selectedProblem === problem.id ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => handleProblemSelect(problem.id)}
            >
              <CardHeader>
                <CardTitle>Topic {problem.group}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{problem.statement}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

