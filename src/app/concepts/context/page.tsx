"use client"

import React from 'react';
import Link from 'next/link';

import { getRouteGroup } from '@/app/lib/routes';

export default function ContextHome() {
  const routes = getRouteGroup('context');

  console.log(routes)
  return (
    <div className="p-2">
      <h1 className="text-2xl">Context Home</h1>
      <h2 className="text-xl">Routes</h2>
      {routes.map((route) => {
        return (
          <div>
            <Link href={route.path} className={`px-2 py-1.5 lg:px-4 lg:py-0 text-sm lg:text-base text-gray-700 hover:text-gray-900 ${route.bold}`}>
              {route.name}
            </Link>
          </div>
        )
      })}
    </div>
  );
}
