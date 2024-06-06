"use client"
import React from 'react';

import Link from 'next/link';
import { FaGithub } from "react-icons/fa";
import Badge from '@/core/Badge';
import RoutesList from '@/app/components/general/RoutesList';

const Sidebar = () => {
  const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
  const baseClass = 'fixed top-0 left-0 h-full w-64 flex flex-col'
  return (
    <div className={`${baseClass} hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40`}>
      <div className="flex h-[60px] items-center justify-around border-b px-5">
        <Link href="https://github.com/coolinmc6/playaround-2023" className="flex items-center gap-2">
          <FaGithub />
          <span>playaround-2023</span>
        </Link>
      </div>
      <div className="pt-4">
        <RoutesList />
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
