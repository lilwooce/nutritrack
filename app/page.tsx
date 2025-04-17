import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function SplashScreen() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-between flex-1 bg-purple-950 relative overflow-hidden">
        {/* Background food pattern */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-14%20020604-wvTtyQ7eN4oja6nO9GyjcHNtRdHtQs.png"
            alt="Food background"
            fill
            className="object-cover opacity-100"
            priority
          />
        </div>

        {/* Content container */}
        <div className="flex flex-col items-center justify-center flex-1 z-10 px-8 w-full max-w-md mx-auto text-center">
          {/* Logo */}
          <div className="mb-4 w-16 h-16 bg-white rounded-lg flex items-center justify-center">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 relative">
                  <div className="absolute top-0 left-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-red-500"></div>
                  <div className="absolute top-0 right-0 w-0 h-0 border-r-[20px] border-r-transparent border-b-[20px] border-b-green-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 w-0 h-0 mx-auto border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-yellow-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* App name and tagline */}
          <h1 className="text-3xl font-bold text-white mb-2">NutriTrack</h1>
          <p className="text-white text-center mb-12 text-sm">
            Track your daily nutrients easily at
            <br />
            campus dining halls!
          </p>
        </div>

        {/* Get Started button */}
        <div className="w-full max-w-md mx-auto px-6 mb-12 z-10">
          <Link href="/login">
            <Button className="w-full py-6 text-white bg-red-600 hover:bg-red-700 rounded-md font-medium text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
