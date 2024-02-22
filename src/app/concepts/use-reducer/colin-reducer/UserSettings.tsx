"use client"

import React, { useReducer } from 'react'
import { userSettingsReducer } from './userSettingsReducer'

const defaultUser = {
  name: 'John Smith',
  email: 'johnsmith@gmail.com',
  receiveNewsletter: true,
  theme: 'dark',
  active: true,
}

const UserSettings = () => {
  const [user, dispatch] = useReducer(userSettingsReducer, defaultUser)

  const handleToggleNewsletter = () => {
    dispatch({ type: 'toggle-newsletter' })
  }

  const handleToggleTheme = () => {
    dispatch({ type: 'toggle-theme' })
  }

  const handleToggleActivation = () => {
    dispatch({ type: 'toggle-activation' })
  }

  return (
    <div className="m-8 border-solid border-4 border-green-300 max-w-sm">
      <h4 className="font-bold p-2">User Profile</h4>
      <div className="p-2">
        <p>
          Name: {user.name}<br />
          <input type="text" value={user.name} onChange={(e) => dispatch({ type: 'update-name', payload: { name: e.target.value } })} />
        </p>
        <p>
          Email: {user.email}<br />
          <input type="text" value={user.email} onChange={(e) => dispatch({ type: 'update-email', payload: { email: e.target.value }})} />
        </p>
        <p>
          Receive Newsletter: <span className="inline-block w-5">{user.receiveNewsletter ? 'Yes' : 'No'}</span>
          <input className="ml-4" type="checkbox" checked={user.receiveNewsletter} onChange={handleToggleNewsletter} />
        </p>
        <p>
          Theme: {user.theme}
          <button className="ml-4" onClick={handleToggleTheme}>Toggle Theme</button>
        </p>
        <p>
          Active: {user.active ? 'Yes' : 'No'}
          <button className="ml-4" onClick={handleToggleActivation}>Toggle Activation</button>
        </p>
      </div>
    </div>
  )
}

export default UserSettings;
