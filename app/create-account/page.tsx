"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Mail, Lock, Building } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateAccount() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [university, setUniversity] = useState("")
  const [agreed, setAgreed] = useState(false)

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password && university && agreed) {
      router.push("/home")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Status bar */}
      <div className="bg-black text-white p-2 flex items-center justify-between">
        <div>9:41</div>
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold text-center mt-8 mb-2">Create Account</h1>
        <p className="text-center text-gray-600 mb-8">Create your account to start tracking your nutrition.</p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Your email address"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              placeholder="Create a password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Your university affiliation"
              className="pl-10"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree with Terms & Conditions
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
            disabled={!email || !password || !university || !agreed}
          >
            Sign Up
          </Button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">Already registered? </span>
          <Link href="/login" className="text-red-600 text-sm font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
