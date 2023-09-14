import './globals.css'
import type { Metadata } from 'next'


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
      <body>{children}</body>
    </html>
  )
}
