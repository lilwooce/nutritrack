"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowLeft, Calendar, Utensils, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { useFoodItems } from "@/context/food-context"

export default function DeleteFoodItem() {
  const router = useRouter()
  const { foodItems, deleteFoodItem } = useFoodItems()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [itemName, setItemName] = useState("")
  const [calories, setCalories] = useState("")
  const [date, setDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Find items matching the criteria
    const itemsToDelete = foodItems
      .filter((item) => {
        const nameMatch = itemName ? item.name.toLowerCase().includes(itemName.toLowerCase()) : true
        const caloriesMatch = calories ? item.calories === Number.parseInt(calories) : true
        const dateMatch = date ? item.date === date : true

        return nameMatch && caloriesMatch && dateMatch
      })
      .map((item) => item.id)

    if (itemsToDelete.length > 0) {
      itemsToDelete.forEach((id) => deleteFoodItem(id))
      router.push("/nutrition-tracking")
    } else {
      alert("No matching items found")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="p-4 flex items-center">
        <Link href="/nutrition-tracking">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold mx-auto">Delete Form</h1>
      </div>

      <div className="p-6 flex-1">
        <p className="text-center text-gray-500 mb-8">Enter criteria to delete items</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Utensils className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Item name"
              className="pl-10 bg-gray-100"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div className="relative">
            <Activity className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="number"
              placeholder="Calories"
              className="pl-10 bg-gray-100"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="date"
              placeholder="Date"
              className="pl-10 bg-gray-100"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
            Delete Matching Items
          </Button>
        </form>
      </div>
    </div>
  )
}
