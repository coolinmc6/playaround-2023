"use client"

import React, { useState } from 'react';
import { addToast, type Severity } from '@store/toast';

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl mb-2">React Playaround 2023</h1>
      <button onClick={addRandomToast}>Add Random Toast</button>
    </main>
  )
}

export default Home;