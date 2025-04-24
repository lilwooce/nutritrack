'use client';

import BottomNav from '@/components/bottom-nav';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { AuthProvider } from '@/context/auth-context';
import { ArrowLeft, Edit, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Nutrient {
  name: string;
  unit: string;
  amount: number;
}

interface Meal {
  _id: string;
  name: string;
  nutrients: Nutrient[];
  imageUrl?: string;
}

export default function NutritionTracking() {
  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setIsLoggedIn(true);
          const user = JSON.parse(storedUser);
          const response = await fetch(`/api/meals/user?user=${user._id}`);
          const data: Meal[] = await response.json();
          setMeals(data);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  const handleAddItem = () => {
    router.push('/nutrition-tracking/add');
  };

  const handleDeleteItem = async () => {
    if (selectedItems.length === 0) {
      alert('Please select items to delete');
      return;
    }

    try {
      const response = await fetch('/api/meals/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedItems }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete items');
      }

      setMeals((meals) =>
        meals.filter((meal) => !selectedItems.includes(meal._id))
      );
      setSelectedItems([]);
    } catch (error) {
      console.error('Deletion error:', error);
      alert('An error occurred while deleting items.');
    }
  };

  const handleEditItem = () => {
    if (selectedItems.length === 1) {
      const selectedId = selectedItems[0];
      const selectedMeal = meals.find((meal) => meal._id === selectedId);

      if (!selectedMeal) {
        alert("Selected meal not found.");
        return;
      }

      localStorage.setItem("selectedFoodItem", JSON.stringify(selectedMeal));
      router.push(`/nutrition-tracking/edit?id=${selectedId}`);
    } else {
      alert("Please select exactly one item to edit");
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem('selectedMeals', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        {/* Header */}
        <div className="p-4 bg-white flex items-center justify-between">
          <Link href="/dining-options">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold">Nutrition Tracking</h1>
          <Button
            variant="destructive"
            className="rounded-full px-4 py-1 h-auto text-sm"
            onClick={() => {
              localStorage.removeItem('user');
              router.push('/login');
            }}
          >
            Logout
          </Button>
        </div>

        {/* Meals list */}
        <div className="flex-1 p-4 space-y-6 overflow-auto">
          {meals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>No meals added yet.</p>
              <p className="text-sm">Click "Add" to track your first meal.</p>
            </div>
          ) : (
            meals.map((meal) => (
              <div
                key={meal._id}
                className={`bg-white rounded-lg shadow p-4 ${selectedItems.includes(meal._id) ? 'border-2 border-red-500' : ''}`}
                onClick={() => toggleSelectItem(meal._id)}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{meal.name}</h3>
                    <div className="text-sm text-gray-500">
                      {meal.nutrients.map((nutrient) => (
                        <p key={nutrient.name} className="text-xs text-gray-400">
                          {nutrient.name}: {nutrient.amount} {nutrient.unit}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="w-20 h-20 relative rounded-md overflow-hidden">
                    <Image
                      src={meal.imageUrl || '/placeholder.svg'}
                      alt={meal.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action buttons */}
        <div className="p-4 flex justify-around gap-4">
          <Button
            onClick={handleAddItem}
            className={`flex-1 text-white ${isLoggedIn ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!isLoggedIn}
          >
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
    </AuthProvider>
  );
}
