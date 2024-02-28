"use client";

import React, { useContext } from 'react';
import { LevelContext } from './LevelContext';

type BCSectionProps = {
  children: React.ReactNode;
}

export default function Section({ children }: BCSectionProps) {
  const level = useContext(LevelContext)
  return (
    <section className="section p-2 m-2 border-solid border-gray-300 border-rounded border-2 rounded-md">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
