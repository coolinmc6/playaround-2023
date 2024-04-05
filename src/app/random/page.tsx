"use client";

import React, { useState } from 'react';
import Button from '@/core/Button';

import MuiCard from '@/core/MuiCard';
import { addToast } from '@store/toast';
import { generateRandomId } from '@/app/lib/helpers'
import KeyPad from '@/app/random/components/Keypad';

export default function RandomHome () {
  const [sections, setSections] = useState([0])
  const [keyPadValue, setKeyPadValue] = useState('')
  const handleClick = () => {
    addToast({
      severity: 'success',
      message: 'You clicked the button!',
      id: generateRandomId(),
    })
  }

  const keyPadClick = (value: string) => {
    console.log(value)
    if (value !== '⌫' && value !== '↩️') {
      setKeyPadValue(keyPadValue + value)
    }
    if (value === '⌫') {
      setKeyPadValue(keyPadValue.slice(0, -1))
    }
    if (value === '↩️') {
      setKeyPadValue('')

    }
  }

  const toggleSection = (index: number) => {
    const newSections = [...sections]
    newSections[index] = newSections[index] === 0 ? 1 : 0
    setSections(newSections)
  }
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Random</h1>
      <div className="">
        <Button onClick={() => toggleSection(0)}>{sections[0] === 0 ? 'Show' : 'Hide'} Card</Button>
      </div>
      {sections[0] === 1 ? (
        <MuiCard className="max-w-80">
          <MuiCard.Header>Card Header</MuiCard.Header>
          <MuiCard.Content className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, eveniet! Delectus explicabo harum, consectetur quaerat amet odit hic voluptates veritatis laudantium ullam esse quod libero temporibus facere laborum autem voluptatum.
          </MuiCard.Content>
          <MuiCard.ActionArea buttonText="Click Me" onClick={handleClick} >
            <p>Click me to see what happens</p>
          </MuiCard.ActionArea>
        </MuiCard>
      ) : null}
      <section>
        <div className="text-center text-4xl h-12">{keyPadValue.split('').map((digit, index) => {
          return <span className="pl-2 pr-2" key={`${digit}-${index}`}>{digit}</span>
        })}</div>
        <KeyPad handleClick={keyPadClick} />
      </section>
    </div>
  )
}
