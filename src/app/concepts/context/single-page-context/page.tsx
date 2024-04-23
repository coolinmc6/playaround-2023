"use client"

import React, { createContext, useContext, useState, useReducer, type Dispatch, type PropsWithChildren } from 'react';
import NotesSection from '@/core/NotesSection';
import { generateRandomId } from '@/app/lib/helpers.js'
import Button from '@/core/Button';
// import CodeBlock from '@/core/CodeBlock';

type Pokemon = {
  name: string;
  type: string;
  id: string;
}

type State = {
  pokemon: Pokemon[];
}

const initialState: State = {
  pokemon: [],
}

const PokemonContext = createContext<State>(initialState);
const PokemonDispatchContext = createContext<Dispatch<Action>>(() => {});

type Action = {
  type: string;
  payload: any;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_POKEMON': {
      return {
        ...state,
        pokemon: [...state.pokemon, action.payload]
      }
    }
    case 'DELETE_POKEMON': {
      return {
        ...state,
        pokemon: state.pokemon.filter((pokemon: any) => pokemon.id !== action.payload)
      }
    }
    default: {
      return state;
    }
  }
}

const PokemonProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PokemonContext.Provider value={state}>
      <PokemonDispatchContext.Provider value={dispatch}>
        {children}
      </PokemonDispatchContext.Provider>
    </PokemonContext.Provider>
  )
}

const PokemonList = () => {
  const state = useContext(PokemonContext);
  const dispatch = useContext(PokemonDispatchContext)
  const { pokemon } = state;

  return (
    <div>
      <h2>List of Pokemon</h2>
      {pokemon.map((pokemon: Pokemon) => {
        return (
          <div key={pokemon.id} className="py-2">
            <span className="px-2">
              {pokemon.name} (ID: {pokemon.id})
            </span>
            <Button randomColor onClick={() => dispatch({ type: 'DELETE_POKEMON', payload: pokemon.id })}>Delete</Button>
          </div>
        )
      })}
    </div>
  )
}

const PokemonCreator = () => {
  const dispatch = useContext(PokemonDispatchContext);

  const addPokemon = () => {
    dispatch({
      type: 'ADD_POKEMON',
      payload: { name: 'Pikachu', type: 'Electric', id: generateRandomId() }
    })
  }

  return (
    <div>
      <Button randomColor onClick={addPokemon}>Add Pokemon</Button>
    </div>
  )

}

const SinglePageContext = () => {
  return (
    <div className="p-2">
      <h1 className="text-2xl">Single Page Context</h1>
      <PokemonProvider>
        <PokemonCreator />
        <PokemonList />
      </PokemonProvider>
      <NotesSection>
        <NotesSection.Paragraph>
          This page uses the context with dispatch pattern. I think what was confusing me about the pattern
          was the mix-up with the old context API and the Consumer-Provider idea. Instead, you have the
          Provider which allows you to pass the value to the children and then the useContext hook to
          grab the value from the context. Here is a quick list of steps if I were to do it again:
        </NotesSection.Paragraph>
        <ol className="py-4">
          <li>1. Create both contexts - one with state, one with dispatch</li>
          <li>2. Create your reducer</li>
          <li>3. Create a provider component that has BOTH providers; one with state, one with dispatch</li>
          <li>4. Create (add to) component that requires the context. Use useContext to get either state or dispatch or both</li>
          <li>5. Now you can use either however you need it</li>
        </ol>
        Here are some tips around TypeScript and useReducer that tripped me up:
        <ul className="py-4">
          <li>
            1. The reducer must ALWAYS return state. Add a default case to your switch statement to
            return state, especially if you don't know all the cases you'll need to account for.
          </li>
          <li>
            2. When initializing your dispatch context, you can use a blank function. I initially did
            a function or null but that was causing TypeScript error about the function possibly being null.
          </li>
          <li>
            3. Reducer function arguments are state and then action.
          </li>
        </ul>
      </NotesSection>
    </div>
  )
}

export default SinglePageContext;
