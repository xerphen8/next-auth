"use client"

import {SessionProvider} from 'next-auth/react'
import { ReactNode } from 'react'

const NextAuthProviders = ({children, session}) => {
  return (
    <SessionProvider session={session}>{children}</SessionProvider>
  )
}

export default NextAuthProviders;