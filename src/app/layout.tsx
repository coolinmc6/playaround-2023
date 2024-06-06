import './styles/globals.css'
import './styles/prism.css'
import { type Metadata } from 'next'
import dynamic from 'next/dynamic';
import Header from '@/app/components/Header'
import Sidebar from '@/app/components/SideBar'
import ToastList from '@/core/ToastList/ToastList'
import { openDialog } from '@/app/store/dialog';

const DialogContainer = dynamic(() => import('@/app/components/dialogs/DialogContainer'), { ssr: false })
const NavigationButton = dynamic(() => import('@/app/components/general/NavigationButton'), { ssr: false })


export const metadata: Metadata = {
  title: 'React Playaround 2023',
  description: 'The place to practice concepts, patterns, and ideas in React, Next.js, and TypeScript.',
}

// https://next-admin-dash.vercel.app/

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  // const handleNavOpen = () => openDialog('navigation-dialog')
  return (
    <html lang="en">
      <body className="relative">
        <Sidebar />
        <main className="lg:ml-64 h-full">
          <div className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
            <NavigationButton />
          </div>
          {children}
          <DialogContainer />
          <ToastList />
        </main>
        <script async src="./prism.js"></script>
      </body>
    </html>
  )
}
