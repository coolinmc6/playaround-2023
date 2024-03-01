"use client"

import React, { createContext, useContext } from 'react';
import NotesSection from '@/core/NotesSection';

/*
How to create a context from scratch in one page:
- Create a context using createContext
- #1: A basic usage is to just use useContext and then you can display the user info
- #2: what is Provider vs Consumer

*/

type UserContextType = {
  name: string;
  age: number;
  location: string;
}

const UserContext = createContext<UserContextType | null>(null)


const HijackingParent = ({ name, children }: { name: string, children: React.ReactNode }) => {
  return (
    <div className="border-solid bg-red-100 p-4 m-4">
      <UserContext.Provider value={{ name: 'Colin', age: 25, location: 'USA' }}>
        <h1 className="text-2xl">Parent Name: {name}</h1>
        <p><strong>Children of {name}:</strong></p>
        {children}
      </UserContext.Provider>
    </div>
  )
}

const Parent = ({ children, name }: { children: React.ReactNode, name: string }) => {
  const user = useContext(UserContext)
  return (
    <div className="bg-green-100 m-4 p-4">
      <UserContext.Provider value={user}>
        <h1 className="text-2xl">Parent Name: {name}</h1>
        <p><strong>Children of {name}:</strong></p>
        {children}
      </UserContext.Provider>
    </div>
  )
}

const Child = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(UserContext)
  return (
    <div className="bg-purple-100 m-2 p-4">
      <h2>Child</h2>
      <p>User Info</p>
      <pre className="border p-2 border-solid rounded border-black bg-gray-100">{JSON.stringify(user, null, 2)}</pre>
      {children}
    </div>
  )
}

const ColinContextPage = () => {
  const user = useContext(UserContext)
  console.log(user)
  return (
    <div className="p-2">
      <h1>Colin Context Page</h1>
      <div className="p-2">
        <h2>User Info</h2>
        <p>this is an active look at the context for this element</p>
        <pre className="border p-2 border-solid rounded border-black bg-gray-100">{JSON.stringify(user, null, 2)}</pre>
      </div>
      <HijackingParent name="HijackingParent">
        <Child>
          Child
        </Child>
      </HijackingParent>
      <Parent name="Normal Parent">
        <Child>
          Child
        </Child>
      </Parent>
      <NotesSection>
        <p className="pb-2">
          I think I&apos;m so used to trying to having a global state or some single source of truth. The reality is that
          regardless of what you make that first context, the value is what is given to it by the provider. So by setting
          the value in the provider, it&apos;s not like a global store like Zustand. I need to remember that.
        </p>
      </NotesSection>
    </div>
  )
}

export default ColinContextPage;
