'use client';

import { useMemo, useState } from 'react'

/**
 * useMemo example from: https://dmitripavlutin.com/react-usememo-hook/
 * 
 */

export default function Performance() {
  const [number, setNumber] = useState(1);
  const [increment, setIncrement] = useState(0);

  const factorial = factorialOf(number)
  // const factorial = useMemo(() => factorialOf(number), [number]);

  const onChange = (e: any) => setNumber(e.target.value);
  const onClick = () => {
    console.log('* * * * Re-render Button Clicked * * * *')
    setIncrement(increment + 1);
  }
  const codeClasses = 'text-sm font-mono bg-gray-100 rounded p-1 text-red-800'
  return (
    <main className="min-h-screen p-12">
      <h1 className="text-3xl font-bold pb-12">useMemo</h1>
      <p className="pb-6">
        This page demonstrates the use of <code className={codeClasses}>useMemo</code>
        to memoize the result of a function call. You can toggle between the two
        implementations by commenting/uncommenting the code. You can see the console logs
        when the function is called. One of the key things to note is that&nbsp;
        <strong>
          whenever state changes, the ENTIRE component re-renders.
        </strong>
        This means that when you click <code className={codeClasses}>re-render</code>,
        we&apos;re simply incrementing a state variable...but that forces the entire
        component to re-render, which means that the factorial function is called again.
      </p>
      <p className="pb-6">
        Key Takeaway: I think a key thing to keep in mind is that the code that I&apos;m applying the 
        <code className={codeClasses}>useMemo</code> to is expensive. We don&apos;t want to do
        ALL that work again just because of a small change in the component. I was so focused on
        when the input to that function would change (and largely focused on that factorial function)
        when you really need to think about the other stuff. You need to use useMemo when you are
        concerned that the component could re-render for minor, unrelated changes. Looking in another
        codebase, I can see that I do not need to understand as much what a particular function is doing
        but rather see the complexity and appreciate that it is expensive and we will want to avoid
        unnecessary re-renders.
      </p>
      <div>
        Factorial of {' '}
        <input
         type="number"
         className="w-[100px] px-3 py-2 border rounded shadow text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
         value={number}
         onChange={onChange} />{' '}
        is {factorial}{' '}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClick}>Re-render</button>
    </div>
    </main>
  )
}

function factorialOf(n: number): number {
  console.log('factorialOf(n) called!');
  return n <= 0 ? 1 : n * factorialOf(n - 1);
}
