"use client"

import React, { useState } from 'react';
import { addToast, type Severity } from '@store/toast';
import Button from '@/core/Button';
import Link from '@/core/Link'

const Home = () => {
  const severityStates = ['success', 'info', 'warning', 'error']
  const [num, setNum] = useState(0)
  const addRandomToast = () => {
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
      <h1 className="text-3xl mb-2 text-center">React Playaround 2023</h1>
      Live app on Vercel: https://playaround-2023.vercel.app/
      <div className="text-center">
        <Button onClick={addRandomToast}>Add Random Toast</Button>
      </div>
    </main>
  )
}

export default Home;
