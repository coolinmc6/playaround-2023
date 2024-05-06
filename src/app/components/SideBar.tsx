"use client"
import React from 'react';

import { routes } from '@/app/lib/routes';
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";
import Badge from '@/core/Badge';
// import { Divider } from '@tremor/react';

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

const USE_OLD = false;

const Sidebar = () => {
  const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
  const baseClass = 'fixed top-0 left-0 h-full w-64 flex flex-col'
  return USE_OLD ? (
    <div className={`${baseClass} bg-blue-100`}>
      {paths}
      <div className="absolute bottom-0 left-0 w-full text-center pb-2 pt-2 bg-red-100">
        {process.env.NEXT_PUBLIC_ENVIRONMENT}
      </div>
    </div>
  ) : (
    <div className={`${baseClass} hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40`}>
      <div className="flex h-[60px] items-center justify-around border-b px-5">
        <Link href="https://github.com/coolinmc6/playaround-2023" className="flex items-center gap-2">
          <FaGithub />
          <span>playaround-2023</span>
        </Link>
      </div>
      <div className="pt-4">
        {paths}
      </div>
      <div className="absolute bottom-0 left-0 w-full text-center pb-2 pt-2">
        <Badge type={isProd ? "warning" : "success"}>
          {process.env.NEXT_PUBLIC_ENVIRONMENT?.toUpperCase()}
        </Badge>
      </div>
    </div>
  )
}

export default Sidebar;
