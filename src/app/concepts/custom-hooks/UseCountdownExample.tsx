import react, { useEffect, useState } from 'react';
import { useCountdown } from '@/app/concepts/custom-hooks/hooks/useCountdown.ts';
import Button from '@/core/Button';
import NotesSection from '@/core/NotesSection';
import Code from '@/core/Code';

const UseCountdownExample = () => {
  const [currValue, setCurrValue] = useState(10);
  
  const { state, reset } = useCountdown({ startValue: currValue });
  
  const increaseCountdown = () => {
    const newValue = currValue + 1;
    setCurrValue(newValue);
    reset(newValue);
  }

  const decreaseCountdown = () => {
    if (currValue <= 1) return;
    const newValue = currValue - 1;
    setCurrValue(newValue);
    reset(newValue);
  }
  
  return (
    <div className="mt-4">
      <h2 className="text-2xl mb-2 text-blue-800">useCountdown</h2>
      <p>
        This custom hook does one thing: it allows a developer to create a countdown. You can initialize it with
        any numeric value and then it counts down to zero. Very basic.
      </p>
      <div className="border-solid border-gray-400 p-4 border-2">
        <p>Countdown: {state}</p>
        <p className="pb-2"><Button onClick={() => reset()}>Reset Timer</Button></p>
        <p>Countdown Length: <Button onClick={() => increaseCountdown()}>+</Button> {currValue} <Button onClick={() => decreaseCountdown()}>-</Button></p>
      </div>
      <NotesSection>
        <NotesSection.Paragraph>
          A few observations on creating this hook. First, it was not super easy. Not because of anything related to a
          hook but because of the <Code>setInterval</Code> function. I&apos;ll show the code later but I clearly need to
          look up using <Code>setInterval</Code> in React applications, especially when it comes to interacting with state.
        </NotesSection.Paragraph>
        <NotesSection.Paragraph>
          Next, I wanted to add a button that would reset the timer. My gut instinct was to try to do it at the top level,
          the component using the hook. But the final answer was actually add a reset function in the hook.
          So now it&apos;s returning both a <Code>state</Code> value and a <Code>reset</Code> function. 
        </NotesSection.Paragraph>
      </NotesSection>
    </div>
  )
}

export default UseCountdownExample;
