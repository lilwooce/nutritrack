"use client"
import BottomNav from "@/components/bottom-nav"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useFoodItems } from "@/context/food-context"
import { Apple, ArrowLeft, Carrot, Coffee, Edit, Plus, Trash, Wheat } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DailySummary() {
  const router = useRouter()
  const { user } = useAuth()
  const { foodItems } = useFoodItems()

  const nutritionCategories = [
    { name: "Dairy and Eggs", icon: Coffee, calories: 411 },
    { name: "Whole Grains", icon: Wheat, calories: 242 },
    { name: "Vegetables", icon: Carrot, calories: 96 },
    { name: "Fruits", icon: Apple, calories: 64 },
  ]

  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0) || 2660

  const handleAddItem = () => {
    router.push("/nutrition-tracking/add")
  }

  const handleDeleteItem = () => {
    router.push("/nutrition-tracking/delete")
  }

  const handleEditItem = () => {
    if (foodItems.length > 0) {
      router.push(`/nutrition-tracking/edit?id=${foodItems[0].id}`)
    } else {
      alert("No items to edit")
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
        <h1 className="text-xl font-bold">Daily Summary</h1>
        <Button variant="destructive" className="rounded-full px-4 py-1 h-auto text-sm">
          Logout
        </Button>
      </div>

      {/* Summary content */}
      <div className="flex-1 p-4 space-y-6">
        <h2 className="text-xl font-semibold">Daily Calorie Summary</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 uppercase">TOTAL CALORIES</p>
            <p className="text-4xl font-bold">{totalCalories}</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 relative">
              <Image
                src="./DailySummary.png"
                alt="Nutrition pie chart"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-3">
            {nutritionCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <category.icon className="h-5 w-5" />
                  <span>{category.name}</span>
                </div>
                <span>{category.calories} kcal</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-4 flex justify-around gap-4">
        <Button onClick={handleAddItem} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
        <Button onClick={handleDeleteItem} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
        <Button onClick={handleEditItem} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>

      <BottomNav active="summary" />
    </div>
  )
}
