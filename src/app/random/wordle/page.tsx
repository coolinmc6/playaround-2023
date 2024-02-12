"use client"

import React from 'react';
import Wordle from '@/app/lib/wordle/wordle'

export default function WordlePage () {
  console.log('hey there')

  const wordle = new Wordle({ answer: 'hello' })
  console.log(wordle)


  return (
    <div>
      <h1>Wordle</h1>
    </div>
  )
}
