"use client"

import BottomNav from "@/components/bottom-nav"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AuthProvider, useAuth } from "@/context/auth-context"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"; // Import Link from Next.js
import { useEffect, useState } from "react"

interface DiningHall {
  id: string
  name: string
  num?: number // Optional, used for numbering
  image: string
}

export default function DiningOptions() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredHalls, setFilteredHalls] = useState<DiningHall[]>([])

  const diningHalls: DiningHall[] = [
    {
      id: "bolton",
      num: 1,
      name: "Bolton",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ep3xSMKAue1LFfdaUTH7wbw3qejLO4.png",
    },
    {
      id: "village-summit",
      num: 5,
      name: "The Village Summit",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8yD87tEFOP9AoCtfLXi3P5msdzERXg.png",
    },
    {
      id: "oglethorpe",
      num: 2,
      name: "Oglethorpe",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JT9cJGNwbr2Vf8pE0Dn9CXMccuJaPd.png",
    },
    {
      id: "snelling",
      num: 3,
      name: "Snelling",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-i2grjvBT8QrclXYD1QrJau7jNWGqKe.png",
    },
    {
      id: "niche",
      num: 3,
      name: "The Niche",
      image: "https://assets.nutrislice.com/asset/serve/image/jpg/219730",
    },
  ]

  useEffect(() => {
    // Filter dining halls based on search query
    if (searchQuery.trim() === "") {
      setFilteredHalls(diningHalls)
    } else {
      const filtered = diningHalls.filter((hall) => hall.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredHalls(filtered)
    }
  }, [searchQuery])

  // Initialize with all dining halls
  useEffect(() => {
    setFilteredHalls(diningHalls)
  }, [])

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        {/* Header */}
        <div className="p-4 bg-white">
          <h1 className="text-xl font-bold text-center">Dining Options</h1>
        </div>

        {/* Search bar */}
        <div className="p-4 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search dining commons"
              className="pl-10 bg-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Dining halls list */}
        <div className="flex-1 p-4 space-y-4 overflow-auto">
          {filteredHalls.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No dining commons found matching "{searchQuery}"</div>
          ) : (
            filteredHalls.map((hall) => (
              <Card key={hall.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start p-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{hall.name}</h3>
                      <Link href={`https://uga.nutrislice.com/menu/dining-hall-${hall.num}`} passHref target="_blank">
                        <Button variant="outline" className="mt-2 text-red-600 border-red-600 hover:bg-red-50">
                          View Menu
                        </Button>
                      </Link>
                    </div>
                    <div className="ml-4 w-24 h-24 relative rounded-md overflow-hidden">
                      <Image src={hall.image || "/placeholder.svg"} alt={hall.name} fill className="object-cover" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <BottomNav active="dining" />
      </div>
    </AuthProvider>
  )
}
