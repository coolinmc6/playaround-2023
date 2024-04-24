"use client";

import React, { 
  useContext, 
  useReducer,
  useState,
  createContext, 
  type Dispatch, type PropsWithChildren } from 'react';
import Button from '@/core/Button';
/*
Steps:
- #1 - create both contexts
- #2 - create reducer
- #3 - create component has both contexts wrapping children, and useReducer
- #4 - create component(s) that requires context
*/


// #1
type Action = {
  type: 'ADD_NAME' | 'ADD_EMAIL' | 'ADD_PASSWORD' | 'CHANGE_PAGE' | 'HANDLE_SUBMISSION';
  payload: any;
}

type State = {
  page: number;
  name: string;
  email: string;
  password: string;
}

const initialState: State = {
  page: 0,
  name: '',
  email: '',
  password: ''
}

const FormContext = createContext<State>(initialState);
const FormDispatchContext = createContext<Dispatch<Action>>(() => initialState);



// #2
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_NAME': {
      return {
        ...state,
        name: action.payload,
        page: 1,
      }
    }
    case 'ADD_EMAIL': {
      return {
        ...state,
        email: action.payload,
        page: 2,
      }
    }
    case 'ADD_PASSWORD': {
      return {
        ...state,
        password: action.payload,
        page: 3,
      }
    }
    case 'CHANGE_PAGE': {
      return {
        ...state,
        page: action.payload,
      }
    }
    case 'HANDLE_SUBMISSION': {
      return state
    }
    default: {
      return state;
    }
  }
}

// #3
const FormContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  )
}

const PageOne = () => {
  const [name, setName] = useState('');
  const state = useContext(FormContext);
  const dispatch = useContext(FormDispatchContext)
  
  const handleClick = () => {
    dispatch({
      type: 'ADD_NAME',
      payload: name,
    })
  }
  
  if (state.page !== 0) return;
  return (
    <div>
      <h1 className="text-2xl">Page One</h1>
      <div>
        <h2>Current State</h2>
        <pre className="bg-gray-100 max-w-xs m-4">
          {JSON.stringify(state, null, 2)}
        </pre>
        <div>
          <label>Name</label><br />
          <input name="name" type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <Button onClick={handleClick}>Next Step</Button>
        </div>
      </div>
    </div>
  )
}

const PageTwo = () => {
  const [value, setValue] = useState('');
  const state = useContext(FormContext);
  const dispatch = useContext(FormDispatchContext)
  
  const handleClick = () => {
    dispatch({
      type: 'ADD_EMAIL',
      payload: value,
    })
  }

  const handleBack = () => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: 0,
    })
  }
  if (state.page !== 1) return;
  return (
    <div>
      <h1 className="text-2xl">Page Two</h1>
      <div>
        <h2>Current State</h2>
        <pre className="bg-gray-100 max-w-xs m-4">
          {JSON.stringify(state, null, 2)}
        </pre>
        <div>
          <label>Email</label><br />
          <input name="email" type="text" placeholder="Enter Your Email" value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
        <div>
          <Button onClick={handleBack} randomColor>Back</Button>
          <Button onClick={handleClick}>Next Step</Button>
        </div>
      </div>
    </div>
  )
}

const PageThree = () => {
  const [value, setValue] = useState('');
  const state = useContext(FormContext);
  const dispatch = useContext(FormDispatchContext)
  
  const handleClick = () => {
    dispatch({
      type: 'ADD_PASSWORD',
      payload: value,
    })
  }

  const handleBack = () => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: 1,
    })
  }
  if (state.page !== 2) return;
  return (
    <div>
      <h1 className="text-2xl">Page Three</h1>
      <div>
        <h2>Current State</h2>
        <pre className="bg-gray-100 max-w-xs m-4">
          {JSON.stringify(state, null, 2)}
        </pre>
        <div>
          <label>Password</label><br />
          <input name="password" type="text" placeholder="Enter Your Password" value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
        <div>
          <Button onClick={handleBack} randomColor>Back</Button>
          <Button onClick={handleClick}>Next Step</Button>
        </div>
      </div>
    </div>
  )
}

const PageFour = () => {
  const [value, setValue] = useState('');
  const state = useContext(FormContext);
  const dispatch = useContext(FormDispatchContext)
  
  const handleClick = () => {
    alert('Form Submitted')
  }

  const handleBack = () => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: 2,
    })
  }
  if (state.page !== 3) return;
  return (
    <div>
      <h1 className="text-2xl">Page Four</h1>
      <div>
        <h2>Current State</h2>
        <pre className="bg-gray-100 max-w-xs m-4">
          {JSON.stringify(state, null, 2)}
        </pre>
        <div>
          <Button onClick={handleBack} randomColor>Back</Button>
          <Button onClick={handleClick}>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default function Context01Home() {
  return (
    <div>
      <FormContextProvider>
        <PageOne />
        <PageTwo />
        <PageThree />
        <PageFour />
      </FormContextProvider>
    </div>
  )
}
