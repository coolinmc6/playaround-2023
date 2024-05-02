'use client';

import React, { useReducer, type Dispatch } from 'react';
import { Switch } from '@tremor/react';

import UseCountExample from '@/app/concepts/custom-hooks/examples/UseCountExample';
import UseCountdownExample from '@/app/concepts/custom-hooks/examples/UseCountdownExample';
import UseLocalStorageExample from '@/app/concepts/custom-hooks/examples/UseLocalStorageExample';
import UseToggleExample from '@/app/concepts/custom-hooks/examples/UseToggleExample';
import UseBooleanExample from '@/app/concepts/custom-hooks/examples/UseBooleanExample';
import Button from '@/core/Button';

type HooksToggles = {
  [key: string]: boolean;
}

const hooksToggles: HooksToggles = {
  useCount: false,
  useCountdown: false,
  useLocalStorage: false,
  useToggle: false,
  useBoolean: true
}

type HooksAction = {
  type: string;
  payload: any;
}

const hooksReducer = (state: HooksToggles, action: HooksAction) => {
  switch (action.type) {
    case 'TOGGLE_HOOK': {
      return {
        ...state,
        [action.payload]: !state[action.payload]
      }
    }
    case 'RESET': {
      return hooksToggles;
    }
    case 'TOGGLE_ON': {
      return Object.keys(state).reduce((acc: any, key) => {
        acc[key] = true;
        return acc;
      }, {});
    }
    case 'TOGGLE_OFF': {
      return Object.keys(state).reduce((acc: any, key) => {
        acc[key] = false;
        return acc;
      }, {});
    }
    default: {
      return state;
    }
  }
}

type HooksSwitchesProps = {
  dispatch: Dispatch<HooksAction>;
  hooks: HooksToggles;
}

const HookSwitches = ({ dispatch, hooks }: HooksSwitchesProps) => {
  const keys = Object.keys(hooks);
  const toggleAll = ['TOGGLE_ON', 'TOGGLE_OFF']
  return (
    <div>
      <div>
        Toggle the hooks you want to see
      </div>
      <div className="">
        {toggleAll.map((type) => (
          <Button onClick={() => dispatch({ type, payload: false })} rootClassName='m-2' variant={type === 'TOGGLE_ON' ? 'primary' : 'warning'}>
            {type === 'TOGGLE_ON' ? 'All On' : 'All Off'}
          </Button>
        ))}
      </div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {keys.map((key) => (
          <div className={`flex items-center justify-between p-2 ${hooks[key] ? 'bg-green-100' : 'bg-red-50'} m-1`}>
            <span>{key}</span>
            <Switch
              checked={hooks[key]}
              onChange={() => dispatch({ type: 'TOGGLE_HOOK', payload: key })}
              />
          </div>
        ))}
      </div>
    </div>
  )
}


const CustomHooks = () => {
  const [hooks, dispatch] = useReducer(hooksReducer, hooksToggles);

  return (
    <div className="min-h-screen p-12">
      <h1 className="text-3xl mb-2">Custom Hooks</h1>
      <HookSwitches dispatch={dispatch} hooks={hooks} />
      {hooks.useCount ? <UseCountExample /> : null}
      {hooks.useCountdown ? <UseCountdownExample /> : null}
      {hooks.useLocalStorage ? <UseLocalStorageExample /> : null}
      {hooks.useToggle ? <UseToggleExample /> : null}
      {hooks.useBoolean ? <UseBooleanExample /> : null}
    </div>
  )
}

export default CustomHooks;
