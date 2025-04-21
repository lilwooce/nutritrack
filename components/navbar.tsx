'use client';

import { Button } from "@/components/ui/button";
import { AuthProvider, useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();
  

  return (
    <AuthProvider>
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <div className="w-6 h-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 relative">
                  <div className="absolute top-0 left-0 w-0 h-0 border-l-[10px] border-l-transparent border-b-[10px] border-b-red-500"></div>
                  <div className="absolute top-0 right-0 w-0 h-0 border-r-[10px] border-r-transparent border-b-[10px] border-b-green-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 w-0 h-0 mx-auto border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-yellow-400"></div>
                </div>
              </div>
            </div>
          </div>
          <span className="font-bold text-lg">NutriTrack</span>
        </Link>

        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm hidden md:inline-block">Hello, {user.username}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
    </AuthProvider>
  );
}
