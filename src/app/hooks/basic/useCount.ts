// useCount.ts
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