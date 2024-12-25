'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { onAuthStateChange } from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import { LoadingScreen } from "../utilities/Loader";

export function withAuth(Component: React.ComponentType) {
    return function ProtectedRoute(props: any) {
        const router = useRouter()
        const [loading, setLoading] = useState(true)
    
        useEffect(() => {
          const unsubscribe = onAuthStateChange((user: User | null) => {
            if (!user) {
              router.push('/sign-in')
            } else {
              setLoading(true)
              router.push('dashboard')
            }
          })
    
          return () => unsubscribe()
        }, [router])
    
        if (loading) {
          return <LoadingScreen />
        }
    
        return <Component {...props} />
      }
};