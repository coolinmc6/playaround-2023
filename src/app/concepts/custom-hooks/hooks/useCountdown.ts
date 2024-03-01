import { useEffect, useState } from 'react';


type useCountdownInitialization = {
  startValue: number;
}

const useCountdown = ({ startValue }: useCountdownInitialization) => {
  const [state, setState] = useState(startValue);
  const [resets, setResets] = useState(0);

  const reset = (val = startValue) => {
    setState(val);
    setResets(resets + 1);
  }

  useEffect(() => {
    // Only set up the interval if the state is greater than 0
    if (state > 0) {
      const interval = setInterval(() => {
        setState((currentState) => {
          if (currentState === 1) {
            clearInterval(interval);
          }
          return currentState - 1;
        });
      }, 1000);

      // Cleanup function to clear the interval
      return () => clearInterval(interval);
    }
  }, [state]); // Depend on `state` so that the effect runs when `state` changes

  return {
    state,
    reset
  };
};

export { useCountdown };
