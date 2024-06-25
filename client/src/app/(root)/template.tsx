"use client";

import { useAuth } from '@/context/auth.context'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const RootTemplate = ({ children }: { children :React.ReactNode}) => {

    const { UserProfile,data } = useAuth();
    const [isLoading,setIsLoading] = useState(true)

    const pathname = usePathname()
    const router = useRouter()
  useEffect(() => { 

      const token = localStorage.getItem("token") || ''

      if(!token){
        router.push("/login")
        return
      }
    if (data && data.email){
      console.log("data already hai")

      setIsLoading(false)

    }
    else{ 
        console.log("request ke liye aaya")
         try {
        (async () => { await UserProfile(token) })()
        // router.push("/login")
      setIsLoading(false)
        } catch (error) {
          router.push("/login")

        }
}


  }, [pathname, data])


  if (isLoading){
    return <div>loading....</div>
  }
  return (
    <>
          {children}
    </>
  )
}

export default RootTemplate