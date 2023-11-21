import type { Metadata } from 'next'
import Navbar from '@/components/navbar'


export const metadata: Metadata = {
    title: 'Auth App',
    description: 'Login user to app',
}
  

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <Navbar/>
            {children}
        </main>
    )
}
