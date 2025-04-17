import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"
import { FoodProvider } from "@/context/food-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NutriTrack - Campus Dining Nutrition Tracker",
  description: "Track your daily nutrients easily at campus dining halls!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <FoodProvider>{children}</FoodProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'