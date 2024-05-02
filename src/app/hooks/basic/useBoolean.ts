import React, { useState, useMemo } from 'react';

type Handlers = {
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setState: (value: boolean) => void;
  reset: () => void;
}

type UseBooleanReturn = [
  boolean,
  Handlers
]

export const useBoolean = (initialValue = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialValue)

  const handlers = useMemo(() => ({
    setTrue: () => setValue(true),
    setFalse: () => setValue(false),
    toggle: () => setValue(!value),
    setState: (value: boolean) => setValue(value),
    reset: () => setValue(initialValue)
  }), [initialValue])

  return [
    value,
    handlers
  ]

  // const [state, setState] = React.useState<boolean>(initialValue)

  // const handlers = React.useMemo(
  //   () => ({
  //     setTrue: () => {
  //       setState(true)
  //     },
  //     setFalse: () => {
  //       setState(false)
  //     },
  //     reset: () => {
  //       setState(initialValue)
  //     },
  //     toggle: () => {
  //       setState(s => !s)
  //     },
  //     setState: (val: boolean) => {
  //       setState(val)
  //     }
  //   }),
  //   [initialValue]
  // )

  // return [state, handlers]
}
