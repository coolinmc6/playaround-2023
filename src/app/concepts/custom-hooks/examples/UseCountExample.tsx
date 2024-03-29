import React from 'react';
import Code from '@/core/Code';
import CodeBlock from '@/core/CodeBlock';
import CodeDescription from '@/core/CodeDescription';
import Typography from '@/core/Typography';
import useCount from '@/app/hooks/basic/useCount'

const UseCountExample = () => {
  const { count, increment, setCount } = useCount(5);

  return (
    <div>
      <h2 className="text-2xl mb-2 text-blue-800">useCount</h2>
      <CodeDescription>
        <>
          <div className="pb-6 text-center">
            <p>Count: {count}</p>
            <p><button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={() => increment()}>Increment</button></p>
            <input type="number" className="w-[100px] px-3 py-2 border rounded shadow text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={count} onChange={(e) => setCount(parseInt(e.target.value))} />
          </div>
          <Typography variant="body-1">
          Quick explanation: This is a super basic example. All the code I&apos;ve written in the{' '}
            <Code>useCount.ts</Code> file could have been written in this page. I&apos;m just using&nbsp;
            <Code>useState</Code> to set and store state with the <Code>increment</Code> function just
          being some custom logic to increment <Code>count</Code>. The <Code>input</Code> element is just using the
          actual <Code>setCount</Code> hook to update the state. I am starting with this very basic example
          because I wanted to note the TypeScript typing of the <Code>setCount</Code> part of the code:&nbsp;
            <Code>setCount: Dispatch&lt;SetStateAction&lt;number&gt;&gt;</Code>
          </Typography>
        </>
      
        <CodeBlock language="javascript">
          {`
import { useState, Dispatch, SetStateAction } from 'react';

type UseCountReturn = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  increment: () => void; 
};

const useCount = (number = 0): UseCountReturn => {
  const [count, setCount] = useState(number);
  const increment = () => setCount(c => c + 1);

  return {
    count,
    setCount,
    increment 
  };
};

export default useCount;
`}
        </CodeBlock>
      </CodeDescription>
    </div>
  )
}

export default UseCountExample;
