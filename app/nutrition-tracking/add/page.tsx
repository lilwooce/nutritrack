"use client"

import type React from "react"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import { useMeals } from "@/context/food-context"
import { Activity, ArrowLeft, Calendar, Utensils } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddFoodItem() {
  const router = useRouter()
  const { addMeal } = useMeals()
  const { user } = useAuth();
  const [itemName, setItemName] = useState("")
  const [calories, setCalories] = useState("")
  const [carbs, setCarbs] = useState("")
  const [fat, setFat] = useState("")
  const [protein, setProtein] = useState("")
  const [date, setDate] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    if (!user) {
      router.push("/")
      return <p className="text-center mt-10">Please log in to add a meal.</p>
    }
    e.preventDefault()

    const todayEST = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/New_York",
    });

    const newMeal = {
      name: itemName,
      description: "",
      category: "Lunch",
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: false,
      imageUrl: "/placeholder.svg",
      dateAvailable: todayEST,
      dateAdded: todayEST,
      diningLocation: "Main Dining Hall",
      createdBy: user._id, // replace with dynamic user ID if available
      nutrients: [
        { name: "Calories", unit: "kcal", amount: parseInt(calories) || 0 },
        { name: "Carbs", unit: "g", amount: parseInt(carbs) || 0 },
        { name: "Fat", unit: "g", amount: parseInt(fat) || 0 },
        { name: "Protein", unit: "g", amount: parseInt(protein) || 0 },
      ],
      tags: [],
    }

    try {
      await addMeal(newMeal)
      router.push("/nutrition-tracking")
    } catch (error) {
      console.error("Failed to add meal:", error)
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
        <h1 className="text-xl font-bold mx-auto">Input Form</h1>
      </div>

      <div className="p-6 flex-1">
        <p className="text-center text-gray-500 mb-8">Customize your meal</p>

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
            <Input
              type="number"
              placeholder="Carbs (g)"
              className="bg-gray-100"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Fat (g)"
              className="bg-gray-100"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Protein (g)"
              className="bg-gray-100"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="date"
              className="pl-10 bg-gray-100"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
            Enter
          </Button>
        </form>
      </div>
    </div>
  )
}
