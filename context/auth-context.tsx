"use client"

import { useRouter } from "next/navigation"; // <-- import router
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, username: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter() // <-- initialize router

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const mockUser = {
      id: "1",
      username: email.split("@")[0],
      email,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return Promise.resolve()
  }

  const signup = async (email: string, password: string, username: string) => {
    const mockUser = {
      id: "1",
      username,
      email,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return Promise.resolve()
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/") // <-- redirect to homepage
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
