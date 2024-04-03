"use client";

import React from 'react';

import MuiCard from '@/core/MuiCard';
import { addToast } from '@store/toast';
import { generateRandomId } from '@/app/lib/helpers'
import KeyPad from '@/app/random/components/Keypad';

export default function RandomHome () {
  const handleClick = () => {
    addToast({
      severity: 'success',
      message: 'You clicked the button!',
      id: generateRandomId(),
    })
  }

  const keyPadClick = (value: string) => {
    console.log(value)
  }
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Random</h1>
      <MuiCard className="max-w-80">
        <MuiCard.Header>Card Header</MuiCard.Header>
        <MuiCard.Content className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, eveniet! Delectus explicabo harum, consectetur quaerat amet odit hic voluptates veritatis laudantium ullam esse quod libero temporibus facere laborum autem voluptatum.
        </MuiCard.Content>
        <MuiCard.ActionArea buttonText="Click Me" onClick={handleClick} >
          <p>Click me to see what happens</p>
        </MuiCard.ActionArea>
      </MuiCard>
      <KeyPad handleClick={keyPadClick} />
    </div>
  )
}
