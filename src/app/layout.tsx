import '@/styles/globals.css'
import { ReactNode } from 'react'
import { ReduxProviders } from '../context/reduxProvider'
import NextAuthProvider from '../context/nextAuthProvider'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function RootLayout({ children }: {children: ReactNode}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <head>
        <title>Twogather</title>
      </head>
      <body>
        <ReduxProviders>
          <NextAuthProvider session={session}>
            {children}
          </NextAuthProvider>
        </ReduxProviders>
      </body>
    </html>
  )
}
