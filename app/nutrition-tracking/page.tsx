"use client"

import BottomNav from "@/components/bottom-nav"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useFoodItems } from "@/context/food-context"
import { ArrowLeft, Edit, Plus, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NutritionTracking() {
  const router = useRouter()
  const { user } = useAuth()
  const { foodItems, deleteFoodItem } = useFoodItems()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleAddItem = () => {
    router.push("/nutrition-tracking/add")
  }

  const handleDeleteItem = () => {
    if (selectedItems.length > 0) {
      router.push("/nutrition-tracking/delete")
    } else {
      alert("Please select items to delete")
    }
  }

  const handleEditItem = () => {
    if (selectedItems.length === 1) {
      router.push(`/nutrition-tracking/edit?id=${selectedItems[0]}`)
    } else {
      alert("Please select exactly one item to edit")
    }
  }

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="p-4 bg-white flex items-center justify-between">
        <Link href="/dining-options">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">Nutrition Tracking</h1>
        <Button variant="destructive" className="rounded-full px-4 py-1 h-auto text-sm">
          Logout
        </Button>
      </div>

      {/* Food items list */}
      <div className="flex-1 p-4 space-y-6 overflow-auto">
        {foodItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <p>No food items added yet.</p>
            <p className="text-sm">Click "Add" to track your first item.</p>
          </div>
        ) : (
          foodItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow p-4 ${selectedItems.includes(item.id) ? "border-2 border-red-500" : ""}`}
              onClick={() => toggleSelectItem(item.id)}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Calories: {item.calories} kcal</p>
                  <p className="text-xs text-gray-400">
                    Carbs: {item.carbs}g, Fat: {item.fat}g, Protein: {item.protein}g
                  </p>
                </div>
                <div className="w-20 h-20 relative rounded-md overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action buttons */}
      <div className="p-4 flex justify-around gap-4">
        <Button onClick={handleAddItem} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
        <Button
          onClick={handleDeleteItem}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          disabled={selectedItems.length === 0}
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
        <Button
          onClick={handleEditItem}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          disabled={selectedItems.length !== 1}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>

      <BottomNav active="nutrition" />
    </div>
  )
}
