"use client"

import React from 'react';
// https://next-admin-dash.vercel.app/
import { routes } from '@/app/lib/routes';
import Link from 'next/link';

const paths = Object.keys(routes).map((key) => {
  const route = routes[key as keyof typeof routes];
  return (
    <Link href={route.path} key={route.path} className="px-2 py-1.5 lg:px-4 lg:py-0 text-sm lg:text-base text-gray-700 hover:text-gray-900">
      {route.name}
    </Link>
  )
})

const Header = () => {
  
  return (
    <div className="py-1.5 lg:h-[97px] lg:py-0 border-b bg-white flex items-center w-full z-20">
      {paths}
    </div>
  )
}

export default Header;
