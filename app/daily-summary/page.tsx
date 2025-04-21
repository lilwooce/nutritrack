"use client";

import BottomNav from "@/components/bottom-nav";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useMeals } from "@/context/food-context";
import { ArrowLeft, Edit, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Nutrient {
  name: string;
  unit: string;
  amount: number;
}

export default function DailySummary() {
  const router = useRouter();
  const { user } = useAuth();
  const { meals } = useMeals();

  const [customMessage, setCustomMessage] = useState('');
  const [loading, setLoading] = useState(false); // To track loading state

  // Compute “today” in EST
  const todayUTC = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'

  // Filter only meals whose dateAdded falls on todayEST
  const todaysMeals = useMemo(() => {
    if (!user || !meals || meals.length === 0) {
      console.log("No meals available or user not logged in");
      return [];
    }

    console.log("Filtering meals for today's date:", todayUTC);
    console.log("Filtering meals for user:", user.username);

    return meals.filter((meal) => {
      if (!meal.dateAvailable || meal.createdBy !== user._id) {
        console.log("Skipping meal due to missing dateAvailable or user mismatch:", meal);
        return false;
      }

      const mealDate = new Date(meal.dateAvailable).toISOString().split("T")[0];
      return mealDate == todayUTC;
    });
  }, [meals, todayUTC, user]);

  console.log("Today's meals:", todaysMeals);

  // Sum up each nutrient for today's meals
  const totals = useMemo(() => {
    const t = { calories: 0, carbs: 0, fat: 0, protein: 0 };
    todaysMeals.forEach((meal) => {
      console.log("Processing meal:", meal.name, "Date:", meal.dateAdded);
      meal.nutrients.forEach((n) => {
        switch (n.name.toLowerCase()) {
          case "calories":
            t.calories += n.amount;
            break;
          case "carbs":
            t.carbs += n.amount;
            break;
          case "fat":
            t.fat += n.amount;
            break;
          case "protein":
            t.protein += n.amount;
            break;
        }
      });
    });
    return t;
  }, [todaysMeals]);

  const nutrientStats = [
    { name: "Calories", amount: totals.calories, unit: "kcal" },
    { name: "Carbs", amount: totals.carbs, unit: "g" },
    { name: "Fat", amount: totals.fat, unit: "g" },
    { name: "Protein", amount: totals.protein, unit: "g" },
  ];

  const handleAddItem = () => router.push("/nutrition-tracking/add");
  const handleDeleteItem = () => router.push("/nutrition-tracking/delete");
  const handleEditItem = () => {
    if (todaysMeals.length > 0) {
      router.push(`/nutrition-tracking/edit?id=${todaysMeals[0]._id}`);
    } else {
      alert("No items to edit");
    }
  };

  // Function to get custom message from server
  const fetchMessage = async () => {
    if (loading) return; // If already loading, prevent the function from running again

    setLoading(true); // Set loading to true when the request starts

    try {
      console.log("Fetching custom message with totals:", totals);
      const response = await fetch('/api/ai/generateMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(totals),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Custom message received:", data.message);
        setCustomMessage(data.message);
      } else {
        setCustomMessage("Sorry, something went wrong while generating your summary.");
      }
    } catch (error) {
      console.error("Error fetching message:", error);
      setCustomMessage("Sorry, something went wrong while generating your summary.");
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  useEffect(() => {
    const totalsReady = Object.values(totals).some(val => val > 0);
    if (user && totalsReady && !loading) {
      fetchMessage();
    }
  }, [totals, user]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="p-4 bg-white flex items-center justify-between">
        <Link href="/dining-options">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">Daily Summary</h1>
        <Button
          variant="destructive"
          className="rounded-full px-4 py-1 h-auto text-sm"
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </div>

      {/* Summary content */}
      <div className="flex-1 p-4 space-y-6">
        <h2 className="text-xl font-semibold">Summary for {todayUTC}</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 uppercase">TOTAL CALORIES</p>
            <p className="text-4xl font-bold">{totals.calories}</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 relative">
              <Image
                src="/DailySummary.png"
                alt="Nutrition chart"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-3">
            {[...nutrientStats].map((stat) => (
              <div key={stat.name} className="flex items-center justify-between">
                <span className="font-medium">{stat.name}</span>
                <span>
                  {stat.amount} {stat.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Message */}
        {customMessage && (
          <div className="bg-white rounded-lg p-4 shadow-sm mt-6">
            <p className="text-center font-semibold text-lg">Your Custom Nutrition Advice:</p>
            <p className="text-center text-sm text-gray-500">{customMessage}</p>
          </div>
        )}
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
  );
}
