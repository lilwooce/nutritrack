"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowLeft, Calendar, Utensils, Activity } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import { useFoodItems } from "@/context/food-context"

export default function EditFoodItem() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { foodItems, updateFoodItem } = useFoodItems()

  const itemId = searchParams.get("id")
  const [itemName, setItemName] = useState("")
  const [calories, setCalories] = useState("")
  const [carbs, setCarbs] = useState("")
  const [fat, setFat] = useState("")
  const [protein, setProtein] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    if (itemId) {
      const item = foodItems.find((item) => item.id === itemId)
      if (item) {
        setItemName(item.name)
        setCalories(item.calories.toString())
        setCarbs(item.carbs.toString())
        setFat(item.fat.toString())
        setProtein(item.protein.toString())
        setDate(item.date)
      }
    }
  }, [itemId, foodItems])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!itemId) return

    const updatedItem = {
      id: itemId,
      name: itemName,
      calories: Number.parseInt(calories) || 0,
      carbs: Number.parseInt(carbs) || 0,
      fat: Number.parseInt(fat) || 0,
      protein: Number.parseInt(protein) || 0,
      date: date,
      image: foodItems.find((item) => item.id === itemId)?.image || "/placeholder.svg",
    }

    updateFoodItem(itemId, updatedItem)
    router.push("/nutrition-tracking")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="p-4 flex items-center">
        <Link href="/nutrition-tracking">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold mx-auto">Edit Item</h1>
      </div>

      <div className="p-6 flex-1">
        <p className="text-center text-gray-500 mb-8">Update your meal information</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Utensils className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Item name"
              className="pl-10 bg-gray-100"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
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
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Input
                type="number"
                placeholder="Carbs (g)"
                className="bg-gray-100"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Fat (g)"
                className="bg-gray-100"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Protein (g)"
                className="bg-gray-100"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="date"
              placeholder="Date"
              className="pl-10 bg-gray-100"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
            Update
          </Button>
        </form>
      </div>
    </div>
  )
}
