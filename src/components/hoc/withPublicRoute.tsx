'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { onAuthStateChange, logout as signOutUser } from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import { LoadingScreen } from "../utilities/Loader";
import { useAppContext } from "../context/AppContext";


export function withPublicRoute(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true)
    const { setUser } = useAppContext();

    useEffect(() => {
      const unsubscribe = onAuthStateChange(async (user: User | null) => {
        if (user) {
          if (user.emailVerified){
            setUser(user)
            const from = searchParams.get('from')
            router.push(from || "/dashboard")
          } else if (!user.emailVerified) {
            setUser(user)
            await signOutUser()
            router.push("/verify-email")
          }
        } else {
          setLoading(false)
        }
      })

      return () => unsubscribe()
    }, [router, searchParams])

    if (loading) {
      return <LoadingScreen />
    }

    return <Component {...props} />
  }
};