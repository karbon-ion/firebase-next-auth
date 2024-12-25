'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { onAuthStateChange } from "@/firebase/auth";
import { User } from "firebase/auth";
import { useLocale } from "next-intl";

export function withPublicRoute(Component: React.ComponentType) {
    return function ProtectedRoute(props: any) {
        const router = useRouter()
        const locale = useLocale();
        const searchParams = useSearchParams()
        const [loading, setLoading] = useState(true)
    
        useEffect(() => {
          const unsubscribe = onAuthStateChange((user: User | null) => {
            if (user) {
              const from = searchParams.get('from')
              router.push(from || "/dashboard")
            } else {
              setLoading(false)
            }
          })
    
          return () => unsubscribe()
        }, [router, searchParams])
    
        if (loading) {
          return <p>...Loading</p>
        }
    
        return <Component {...props} />
      }
};