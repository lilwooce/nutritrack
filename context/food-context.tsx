'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Matches your Mongoose IMeal schema
export interface Nutrient {
  name: string
  unit: string
  amount: number
}

export interface MealItem {
  _id: string
  name: string
  description?: string
  category: string
  isVegan?: boolean
  isVegetarian?: boolean
  isGlutenFree?: boolean
  imageUrl?: string
  dateAvailable?: string
  dateAdded?: string // ISO date string
  diningLocation?: string
  createdBy?: string
  nutrients: Nutrient[]
  tags?: string[]
}

interface FoodContextType {
  meals: MealItem[]
  fetchMeals: () => Promise<void>
  addMeal: (meal: Omit<MealItem, '_id'>) => Promise<MealItem>
  updateMeal: (id: string, meal: Partial<MealItem>) => Promise<MealItem>
  deleteMeal: (id: string) => Promise<void>
}

const FoodContext = createContext<FoodContextType | undefined>(undefined)

export function FoodProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<MealItem[]>([])

  // GET all meals
  const fetchMeals = async () => {
    const res = await fetch('/api/meals')
    if (!res.ok) throw new Error('Failed to fetch meals')
    const data: MealItem[] = await res.json()
    setMeals(data)
  }

  useEffect(() => {
    fetchMeals().catch(console.error)
  }, [])

  // POST a new meal
  const addMeal = async (meal: Omit<MealItem, '_id'>) => {
    const res = await fetch('/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meal),
    })
    if (!res.ok) throw new Error('Failed to add meal')
    const newMeal: MealItem = await res.json()
    setMeals(prev => [...prev, newMeal])
    return newMeal
  }

  // PUT update an existing meal
  const updateMeal = async (id: string, meal: Partial<MealItem>) => {
    const res = await fetch(`/api/meals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meal),
    })
    if (!res.ok) throw new Error('Failed to update meal')
    const updated: MealItem = await res.json()
    setMeals(prev => prev.map(m => (m._id === id ? updated : m)))
    return updated
  }

  // DELETE a meal
  const deleteMeal = async (id: string) => {
    const res = await fetch(`/api/meals/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete meal')
    setMeals(prev => prev.filter(m => m._id !== id))
  }

  return (
    <FoodContext.Provider value={{ meals, fetchMeals, addMeal, updateMeal, deleteMeal }}>
      {children}
    </FoodContext.Provider>
  )
}

export function useMeals() {
  const context = useContext(FoodContext)
  if (!context) throw new Error('useMeals must be used within a FoodProvider')
  return context
}
