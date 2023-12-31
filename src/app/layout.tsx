import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/providers'
import Navbar from '@/components/navbar'
import { cn } from '@/lib/utils'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Main App',
  description: 'Root of the app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen pt-16")}>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
