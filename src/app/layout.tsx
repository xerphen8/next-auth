import '@/styles/globals.css'
import NextAuthProviders from '../context/providers'
import { ReactNode } from 'react'

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProviders>
          {children}
        </NextAuthProviders>
      </body>
    </html>
  )
}
