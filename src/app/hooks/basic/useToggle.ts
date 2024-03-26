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
