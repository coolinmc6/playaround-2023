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
      {route.divider ? <div className="h-6 mb-2" /> : null}
    </div>
  )
})

const RoutesList = () => {

  return (
    <>
      {paths}
    </>
  )
}

export default RoutesList;
