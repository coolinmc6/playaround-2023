"use client"

import React from 'react';
import Link from '@/core/Link';
import RoughCard from '@/core/RoughCard';

const DevToolsHomePage = () => {
  
  return (
    <div className="min-h-screen p-12">
      <h1 className="text-3xl">Dev Tools Home</h1>
      <div className="grid grid-cols-2">
        <RoughCard title="Dev Tools Pages">
          <Link to="/dev-tools/add-content">Add Content</Link>
        </RoughCard>
      </div>
    </div>
  )
}

export default DevToolsHomePage;
