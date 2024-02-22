"use client"
import React from 'react';

import { routes } from '@/app/lib/routes';
import Link from 'next/link';

const paths = Object.keys(routes).map((key) => {
  const route = routes[key as keyof typeof routes];
  const bold = route.bold ? 'font-bold' : '';
  return (
    <div key={route.path}>
      <Link href={route.path} className={`px-2 py-1.5 lg:px-4 lg:py-0 text-sm lg:text-base text-gray-700 hover:text-gray-900 ${bold}`}>
        {route.name}
      </Link>
      {route.divider ? <div className="border-r border-gray-300 h-6 mx-2"></div> : null}
    </div>
  )
})

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-blue-100 flex flex-col">
      {paths}
      <div className="absolute bottom-0 left-0 w-full text-center pb-2 pt-2 bg-red-100">
        {process.env.NEXT_PUBLIC_ENVIRONMENT}
      </div>
    </div>
  )
}

export default Sidebar;
