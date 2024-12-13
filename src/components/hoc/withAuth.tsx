'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { onAuthStateChange } from "@/firebase/auth";
import { User } from "firebase/auth";

export function withAuth(Component: React.ComponentType) {
    return function ProtectedRoute(props: any) {
        const router = useRouter()
        const [loading, setLoading] = useState(true)
    
        useEffect(() => {
          const unsubscribe = onAuthStateChange((user: User | null) => {
            if (!user) {
              router.push('/sign-in')
            } else {
              setLoading(false)
            }
          })
    
          return () => unsubscribe()
        }, [router])
    
        if (loading) {
          return <p>...Loading</p>
        }
    
        return <Component {...props} />
      }
};