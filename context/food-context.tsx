"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface FoodItem {
  id: string
  name: string
  calories: number
  carbs: number
  fat: number
  protein: number
  date: string
  image: string
}

interface FoodContextType {
  foodItems: FoodItem[]
  addFoodItem: (item: FoodItem) => void
  updateFoodItem: (id: string, updatedItem: FoodItem) => void
  deleteFoodItem: (id: string) => void
}

const FoodContext = createContext<FoodContextType | undefined>(undefined)

const defaultItems: FoodItem[] = [
  {
    id: "1",
    name: "Grilled Chicken",
    calories: 250,
    carbs: 0,
    fat: 6,
    protein: 35,
    date: new Date().toISOString(),
    image: "/chicken.png",
  },
  {
    id: "2",
    name: "Avocado Toast",
    calories: 300,
    carbs: 32,
    fat: 16,
    protein: 8,
    date: new Date().toISOString(),
    image: "/avocado-toast.png",
  },
  {
    id: "3",
    name: "Greek Yogurt",
    calories: 100,
    carbs: 5,
    fat: 0,
    protein: 18,
    date: new Date().toISOString(),
    image: "/yogurt.png",
  },
]

export function FoodProvider({ children }: { children: ReactNode }) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])

  useEffect(() => {
    const storedItems = localStorage.getItem("foodItems")
    if (storedItems && JSON.parse(storedItems).length > 0) {
      setFoodItems(JSON.parse(storedItems))
      console.log(JSON.parse(storedItems))
    } else {
      // If no data exists in localStorage, initialize with default items
      setFoodItems(defaultItems)
      console.log("false")
      localStorage.setItem("foodItems", JSON.stringify(defaultItems))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("foodItems", JSON.stringify(foodItems))
  }, [foodItems])

  const addFoodItem = (item: FoodItem) => {
    setFoodItems((prev) => [...prev, item])
  }

  const updateFoodItem = (id: string, updatedItem: FoodItem) => {
    setFoodItems((prev) => prev.map((item) => (item.id === id ? updatedItem : item)))
  }

  const deleteFoodItem = (id: string) => {
    setFoodItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <FoodContext.Provider value={{ foodItems, addFoodItem, updateFoodItem, deleteFoodItem }}>
      {children}
    </FoodContext.Provider>
  )
}

export function useFoodItems() {
  const context = useContext(FoodContext)
  if (context === undefined) {
    throw new Error("useFoodItems must be used within a FoodProvider")
  }
  return context
}

