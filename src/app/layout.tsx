import './styles/globals.css'
import './styles/prism.css'
import type { Metadata } from 'next'
import ToastList from '@/core/ToastList/ToastList'


export const metadata: Metadata = {
  title: 'React Playaround 2023',
  description: 'A place to practice concepts, patterns, and ideas in React, Next.js, and TypeScript.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        {children}
        <ToastList />
        <script async src="./prism.js"></script>
      </body>
    </html>
  )
}
