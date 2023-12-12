"use client"
import React from 'react';

import { routes } from '@/app/lib/routes';
import Link from 'next/link';

const paths = Object.keys(routes).map((key) => {
  const route = routes[key as keyof typeof routes];
  console.log(route);
  return (
    <>
      <Link href={route.path} key={route.path} className="px-2 py-1.5 lg:px-4 lg:py-0 text-sm lg:text-base text-gray-700 hover:text-gray-900">
        {route.name}
      </Link>
      {route.divider ? <div className="border-r border-gray-300 h-6 mx-2"></div> : null}
    </>
  )
})

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-blue-100 flex flex-col">
      {paths}
    </div>
  )
}

export default Sidebar;
