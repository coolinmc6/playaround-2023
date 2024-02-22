"use client"

import React, { useReducer } from 'react'
import UserSettings from '@/app/concepts/use-reducer/colin-reducer/UserSettings'

const ColinApp = () => {


  return (
    <div className="border-solid border-4 border-blue-400 p-4">
      <h2 className="pb-4">Colins UseReducer Example</h2>
      <h4 className="pb-4 font-bold">General Requirements</h4>
      <p className="pb-4">
        Create a User Profile Settings component that allows the user to update their name and email, toggle their preference (receive newsletter, enable dark mode), and then
        deactivate their account.
      </p>
      <p className="pb-4">
        Basic app is below followed by discussion.
      </p>
      <UserSettings />
    </div>
  )
}

export default ColinApp;
