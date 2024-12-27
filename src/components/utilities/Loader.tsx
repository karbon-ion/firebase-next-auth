import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingSplashScreenProps {
  className?: string
}

export function LoadingScreen({ className = '' }: LoadingSplashScreenProps) {
  return (
    <div className={"flex items-center justify-center min-h-screen bg-gray-100"}>
      <div className="mb-4">
        <Logo />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

function Logo() {
  return (
    <div className="rounded-full bg-primary p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-12 w-12 text-primary-foreground"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </div>
  )
}

