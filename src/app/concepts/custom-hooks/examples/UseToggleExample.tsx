import React from 'react';
import Button from '@/core/Button';
import { useToggle } from '@/app/hooks';
import Code from '@/core/Code';
import CodeBlock from '@/core/CodeBlock';

const UseToggleExample = () => {
  const [toggle, setToggle, toggleValue] = useToggle(true);

  const displayValue = toggle ? 'true' : 'false';
  return (
    <div className="mt-4">
      <h2 className="text-2xl mb-2 text-blue-800">useToggle</h2>
      <div>Current Value: {displayValue}</div>
      <div className="flex gap-x-4 mb-4">
        <Button randomColor onClick={() => toggleValue()}>Toggle Value</Button>
        <Button randomColor onClick={() => setToggle(true)}>Set to True</Button>
        <Button randomColor onClick={() => setToggle(false)}>Set to False</Button>
      </div>
      <p className="mb-2">
        My <Code>useToggle</Code> hook works pretty well. I am comparing it to a similar hook I found elsewhere
        just to see if I could do it. One issue was the error I got from TypeScript. Even though I know
        that it&apos; tuple that I&apos;m returning, TypeScript does&apost. So I had to type the return value
        which was a fun little exercise. This is what it looks like:
      </p>
      <CodeBlock language="javascript">
        {`
import React, { useState, type Dispatch, type SetStateAction } from 'react';

// type UseToggleReturn = [boolean, Function, Function]

type UseToggleReturnBetter = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => void
]

export const useToggle = (initialValue = false): UseToggleReturnBetter => {
  const [value, setValue] = useState(initialValue)

  const toggleValue = () => {
    setValue(!value)
  }

  return [value, setValue, toggleValue]
}
`}
      </CodeBlock>
      <p className="mt-2 mb-2">

      </p>
    </div>
  )
}

export default UseToggleExample;
