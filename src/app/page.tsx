"use client"

import React, { useState } from 'react';
import { addToast, type Severity } from '@store/toast';
import Button from '@/core/Button';
import Link from '@/core/Link'

const Home = () => {
  const severityStates = ['success', 'info', 'warning', 'error']
  const [num, setNum] = useState(0)
  const addRandomToast = () => {
    console.log('use random toast button')
    const severity = severityStates[num] as Severity
    addToast({
      message: `This is a ${severity} toast`,
      id: Math.random().toString(),
      open: true,
      severity,
    })
    setNum((num + 1) % 4)
  }


  return (
    <main className="min-h-screen items-center p-12">
      <h1 className="text-3xl mb-2">React Playaround 2023</h1>
      <h2 className="text-xl mb-4">Concepts</h2>
      <ul className="list-disc list-inside">
      <li><Link to="/concepts/custom-hooks">Custom Hooks</Link></li>
        <li><Link to="/concepts/performance">Performance</Link></li>
      </ul>
      <Button onClick={addRandomToast}>Add Random Toast</Button>
    </main>
  )
}

export default Home;