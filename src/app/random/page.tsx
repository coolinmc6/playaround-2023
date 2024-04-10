"use client";

import React, { useState } from 'react';
import Button from '@/core/Button';

import MuiCard from '@/core/MuiCard';
import { addToast } from '@store/toast';
import { generateRandomId } from '@/app/lib/helpers'
import KeyPad from '@/app/random/components/Keypad';

const questions = [
  { text: 'What year did the Phillies win the World Series?', answer: ['1980', '2008'] },
]

const checkAnswer = (answer: string, questionIndex: number) => {
  if (questions[questionIndex].answer.includes(answer)) {
    return true
  }
  return false
}

export default function RandomHome () {
  const [sections, setSections] = useState([0])
  const [keyPadValue, setKeyPadValue] = useState('')
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [correct, setCorrect] = useState(0)
  const handleClick = () => {
    addToast({
      severity: 'success',
      message: 'You clicked the button!',
      id: generateRandomId(),
    })
  }

  const flashCorrect = (correct: boolean) => {
    if (correct) {
      setCorrect(1)
    } else {
      setCorrect(-1)
    }
    setTimeout(() => {
      setCorrect(0)
    }, 2500)
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
      const correct = checkAnswer(keyPadValue, activeQuestion)
      flashCorrect(correct)
      setKeyPadValue('')
    }
  }

  const toggleSection = (index: number) => {
    const newSections = [...sections]
    newSections[index] = newSections[index] === 0 ? 1 : 0
    setSections(newSections)
  }

  const correctClass = correct > 0 ? 'bg-green-200' : correct < 0 ? 'bg-red-200' : ''
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Random</h1>
      <div className="mb-4">
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
        <div className="">
          <div className="text-center text-2xl mb-4">
            <p>{questions[activeQuestion].text}</p>
          </div>
          <div className={`h-12 text-center max-w-xs m-auto pt-2 m-4 ${correctClass}`}>
            {correct > 0 ? 'Correct!' : correct < 0 ? 'Incorrect!' : ''}
          </div>
          <div className="text-center text-4xl h-12">
            {keyPadValue.split('').map((digit, index) => {
              return <span className="pl-2 pr-2" key={`${digit}-${index}`}>{digit}</span>
            })}
          </div>
        </div>
        <KeyPad handleClick={keyPadClick} />
      </section>
    </div>
  )
}
