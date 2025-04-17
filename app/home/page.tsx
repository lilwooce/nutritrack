"use client"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarChart3, HomeIcon, PieChart, Search, Utensils } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface DiningHall {
  id: string
  name: string
  description: string
  foodItems: number
  image: string
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const diningHalls: DiningHall[] = [
    {
      id: "bolton",
      name: "Bolton",
      description: "",
      foodItems: 0,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ep3xSMKAue1LFfdaUTH7wbw3qejLO4.png",
    },
    {
      id: "village-summit",
      name: "The Village Summit",
      description: "",
      foodItems: 0,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8yD87tEFOP9AoCtfLXi3P5msdzERXg.png",
    },
    {
      id: "oglethorpe",
      name: "Oglethorpe",
      description: "",
      foodItems: 0,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JT9cJGNwbr2Vf8pE0Dn9CXMccuJaPd.png",
    },
    {
      id: "snelling",
      name: "snelling",
      description: "",
      foodItems: 0,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-i2grjvBT8QrclXYD1QrJau7jNWGqKe.png",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="p-4 bg-white">
        <h1 className="text-xl font-bold text-center">Home</h1>
      </div>

      {/* Search bar */}
      <div className="p-4 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Input text"
            className="pl-10 bg-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Dining halls list */}
      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {diningHalls.map((hall) => (
          <Card key={hall.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-start p-4">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{hall.name}</h3>
                  <Button variant="outline" className="mt-2 text-red-600 border-red-600 hover:bg-red-50">
                    View Menu
                  </Button>
                </div>
                <div className="ml-4 w-24 h-24 relative rounded-md overflow-hidden">
                  <Image src={hall.image || "/placeholder.svg"} alt={hall.name} fill className="object-cover" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t flex justify-around p-2">
        <Link href="/home" className="flex flex-col items-center p-2 text-red-600">
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/nutrition-tracking" className="flex flex-col items-center p-2 text-gray-400">
          <BarChart3 className="h-6 w-6" />
          <span className="text-xs">Nutrition Tracker</span>
        </Link>
        <Link href="/daily-summary" className="flex flex-col items-center p-2 text-gray-400">
          <PieChart className="h-6 w-6" />
          <span className="text-xs">Daily Summary</span>
        </Link>
        <Link href="/dining-options" className="flex flex-col items-center p-2 text-gray-400">
          <Utensils className="h-6 w-6" />
          <span className="text-xs">Dining Options</span>
        </Link>
      </div>
    </div>
  )
}
