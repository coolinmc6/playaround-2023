"use client";

import React from 'react'
import StartApp from '@/app/concepts/use-reducer/start-code/StartApp'
import FinalApp from '@/app/concepts/use-reducer/final-code/FinalApp'
import ColinApp from '@/app/concepts/use-reducer/colin-reducer/ColinApp';
import NotesSection from '@/core/NotesSection'
import Code from '@/core/Code'
import CodeBlock from '@/core/CodeBlock'

export default function UseReducerHome () {
  return (
    <main className="">
      <h1 className="pb-4">Use Reducer</h1>
      <h2 className="pb-4">Starting Code</h2>
      <StartApp />
      <NotesSection>
        <p className="pb-4">
          I think one good starting point that is made is the discussion on a reducer and why you need it. In the
          example above, we are just storing state in <Code>tasks</Code> and we use <Code>setTasks</Code> to update it.
          This is fine but as the app grows and you need to do different things to your list of tasks, keeping all those
          operations sprinkled thourghout the component is messy. To reduce that complexity, you can put all that state
          logic into a <strong>reducer</strong>.
        </p>
        <p>
          This is where we need to move from setting state in each part of the component via <Code>handleAddTask</Code>,
          <Code>handleChangeTask</Code>, etc. to just dispatching an action to the reducer.
        </p>
      </NotesSection>
      <h2 className="pb-4">Final Code</h2>
      <FinalApp />
      <NotesSection>
        <p className="pb-4">
          A quick couple notes on transitioning the <Code>useState</Code> to <Code>useReducer</Code>. First, it really wasn&apos;t
          that bad. Instead of directly changing the state you just call the reducer and it automatically updates state for
          you. For each condition of your switch statement, you just return the state that you want to update. Dispatch is 
          just the function that calls your reducer. It knows which part of the switch statement by the action you give it.
          Nothing new here for me but I can see the benefits of being able to extract all that logic into a separate file.
        </p>
        <p className="pb-4">
          I can definitely see now the in-between stage of just using <Code>useState</Code> vs using Zustand or some other
          global state manager. If you&apos;re making a lot of changes to state in a component but you <strong>don&apos;t really need</strong>
          &nbsp;this information outside of this component, using <Code>useReducer</Code> would be useful.
        </p>
        <p className="pb-4">
          Even though I just put the reducer in the <Code>FinalApp.js</Code> file, if this was more important code I would definitely
          move it to different file. Another benefit is that I didn&apos;t need to change the other two files. I am still using the exact
          same handler functions, they&apos;re now just calling dispatch for the reducer to handle the state change.
        </p>
      </NotesSection>
      <h2 className="pb-4">My Example</h2>
      <ColinApp />
      <NotesSection>
        <p className="pb-4">
          Implementing it was pretty easy. I didn&apos;t want to waste too much time building the UI but once you do a few of the cases it is pretty
          easy to understand. Below is my basic implementation of the reducer.
        </p>
        <p className="pb-4">
          One thing to note about the reducer in TypeScript is that you need to have a default case. If not, TypeScript throws an error.
        </p>
      </NotesSection>
      <CodeBlock language="javascript">
        {`
type UserSettingsState = {
  name: string;
  email: string;
  receiveNewsletter: boolean;
  theme: string;
  active: boolean;
}

type UserSettingsAction = {
  type: string;
  payload?: any;
}

export const userSettingsReducer = (
    state: UserSettingsState,
    action: UserSettingsAction
  ) => {
  switch (action.type) {
    case 'toggle-activation': {
      return { ...state, active: !state.active };
    }
    case 'toggle-theme': {
      const theme = state.theme === 'dark' ? 'light' : 'dark';
      return { ...state, theme };
    }
    case 'toggle-newsletter': {
      return { ...state, receiveNewsletter: !state.receiveNewsletter };
    }
    case 'update-email': {
      const { email } = action.payload;
      return { ...state, email };
    }
    case 'update-name':{
      const { name } = action.payload;
      return { ...state, name };
    }
    default: {
      return state;
    }
  }
}

`}
      </CodeBlock>
    </main>
  )
}
