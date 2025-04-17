import Link from "next/link"
import { Home, BarChart3, PieChart, Utensils } from "lucide-react"

interface BottomNavProps {
  active: "home" | "nutrition" | "summary" | "dining"
}

export default function BottomNav({ active }: BottomNavProps) {
  return (
    <div className="bg-white border-t flex justify-around p-2">
      <Link
        href="/home"
        className={`flex flex-col items-center p-2 ${active === "home" ? "text-red-600" : "text-gray-400"}`}
      >
        <Home className="h-6 w-6" />
        <span className="text-xs">Home</span>
      </Link>
      <Link
        href="/nutrition-tracking"
        className={`flex flex-col items-center p-2 ${active === "nutrition" ? "text-red-600" : "text-gray-400"}`}
      >
        <BarChart3 className="h-6 w-6" />
        <span className="text-xs">Nutrition Tracker</span>
      </Link>
      <Link
        href="/daily-summary"
        className={`flex flex-col items-center p-2 ${active === "summary" ? "text-red-600" : "text-gray-400"}`}
      >
        <PieChart className="h-6 w-6" />
        <span className="text-xs">Daily Summary</span>
      </Link>
      <Link
        href="/dining-options"
        className={`flex flex-col items-center p-2 ${active === "dining" ? "text-red-600" : "text-gray-400"}`}
      >
        <Utensils className="h-6 w-6" />
        <span className="text-xs">Dining Options</span>
      </Link>
    </div>
  )
}
