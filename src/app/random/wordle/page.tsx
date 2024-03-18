"use client"

import React from 'react';
import Wordle from '@/app/lib/wordle/wordle'

export default function WordlePage () {
  const wordle = new Wordle({ answer: 'hello' })

  return (
    <div>
      <h1>Wordle</h1>
    </div>
  )
}
