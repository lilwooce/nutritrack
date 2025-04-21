"use client"

import type React from "react"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MealItem, useMeals } from "@/context/food-context"
import { Activity, ArrowLeft, Utensils } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditFoodItem() {
  const router = useRouter()
  const { meals } = useMeals()
  const [itemId, setItemId] = useState("")
  const [itemName, setItemName] = useState("")
  const [image, setImage] = useState("")
  const [nutrients, setNutrients] = useState<{ [key: string]: number }>({
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
  })

  useEffect(() => {
    const storedItem = localStorage.getItem("selectedFoodItem")
  
    if (storedItem) {
      try {
        const parsedItem: MealItem = JSON.parse(storedItem)
  
        const nutrientsMap: { [key: string]: number } = {}
        parsedItem.nutrients?.forEach((nutrient) => {
          nutrientsMap[nutrient.name.toLowerCase()] = nutrient.amount
        })
  
        setItemId(parsedItem._id || "")
        setItemName(parsedItem.name || "")
        setImage(parsedItem.imageUrl || "")
  
        setNutrients({
          calories: nutrientsMap["calories"] ?? 0,
          carbs: nutrientsMap["carbs"] ?? 0,
          fat: nutrientsMap["fat"] ?? 0,
          protein: nutrientsMap["protein"] ?? 0,
        })
      } catch (err) {
        console.error("Failed to parse selected item from localStorage", err)
      }
    }
  }, [])
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!itemId || !itemName.trim()) {
      alert("Name is required.")
      return
    }
  
    const updatedItem = {
      id: itemId,
      name: itemName.trim() || "Untitled Item",
      image: image.trim() || "https://via.placeholder.com/150", // Default image if none provided
      nutrients: [
        { name: "Calories", unit: "kcal", amount: nutrients.calories || 0 },
        { name: "Carbs", unit: "g", amount: nutrients.carbs || 0 },
        { name: "Fat", unit: "g", amount: nutrients.fat || 0 },
        { name: "Protein", unit: "g", amount: nutrients.protein || 0 },
      ],
    }
  
    try {
      const response = await fetch("/api/meals/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      })
  
      if (response.ok) {
        localStorage.removeItem("selectedFoodItem")
        router.push("/nutrition-tracking")
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.message}`)
      }
    } catch (error) {
      console.error("Update error:", error)
      alert("An error occurred while updating the item.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

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
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="itemName">
            Item Name
          </label>
          <div className="relative">
            <Utensils className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="itemName"
              type="text"
              placeholder="Item name"
              className="pl-10 bg-gray-100"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="imageUrl">
            Image URL
          </label>
          <div className="relative">
            <Activity className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="imageUrl"
              type="text"
              placeholder="Image URL"
              className="pl-10 bg-gray-100"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nutrients</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-gray-600 mb-1 block" htmlFor="calories">Calories (kcal)</label>
              <Input
                id="calories"
                type="number"
                placeholder="Calories"
                className="bg-gray-100"
                value={nutrients.calories}
                onChange={(e) =>
                  setNutrients({ ...nutrients, calories: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block" htmlFor="carbs">Carbs (g)</label>
              <Input
                id="carbs"
                type="number"
                placeholder="Carbs"
                className="bg-gray-100"
                value={nutrients.carbs}
                onChange={(e) =>
                  setNutrients({ ...nutrients, carbs: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block" htmlFor="fat">Fat (g)</label>
              <Input
                id="fat"
                type="number"
                placeholder="Fat"
                className="bg-gray-100"
                value={nutrients.fat}
                onChange={(e) =>
                  setNutrients({ ...nutrients, fat: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block" htmlFor="protein">Protein (g)</label>
              <Input
                id="protein"
                type="number"
                placeholder="Protein"
                className="bg-gray-100"
                value={nutrients.protein}
                onChange={(e) =>
                  setNutrients({ ...nutrients, protein: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
          Update
        </Button>
      </form>
      </div>
    </div>
  )
}
