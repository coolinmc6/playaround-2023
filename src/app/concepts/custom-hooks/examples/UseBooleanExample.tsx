"use client"

import React from 'react';
import { useBoolean } from '@/app/hooks/basic/useBoolean';
import Button from '@/core/Button';

const UseBooleanExample = () => {
  const [value, {
    setTrue,
    setFalse,
    toggle,
    setState
  }] = useBoolean(true);
  
  console.log({ value })
  return (
    <div>
      <h2 className="text-2xl mb-2 text-blue-800">useBoolean</h2>
      <div>Current Value: {value.toString()}</div>
      <div className="flex justify-between">
        <Button randomColor onClick={setTrue}>Set True</Button>
        <Button randomColor onClick={setFalse}>Set False</Button>
        <Button randomColor onClick={toggle}>Toggle</Button>
        <Button randomColor onClick={() => setState(true)}>Set State to True</Button>
        <Button randomColor onClick={() => setState(false)}>Set State to False</Button>
      </div>
    </div>
  )
}

export default UseBooleanExample;
