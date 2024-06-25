"use client";
import React from 'react'
import { AuthProvider } from './auth.context'

const GlobalContext = ({children}:{children:React.ReactNode}) => {
  return (
    <AuthProvider>
          {children}

    </AuthProvider>
  )
}

export default GlobalContext