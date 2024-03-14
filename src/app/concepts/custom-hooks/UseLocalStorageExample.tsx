"use client"

import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@/app/hooks/basic/useLocalStorage';
import RoughCard from '@/core/RoughCard';

const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
}

const UseLocalStorageExample = () => {
  const [name, setName] = useLocalStorage("name", '');
  const [name2, setName2] = useState('');

  return (
    <div className="align-top">
      <h2 className="text-2xl mb-2 text-blue-800">UseLocalStorageExample</h2>
      <div className="grid grid-cols-2">
        <RoughCard title="Local Storage" >
          <div>
        Current value: {name}
          </div>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <div>
        Value in Local Storage: {getLocalStorage("name")}
          </div>
        </RoughCard>
        <RoughCard title="Use State Only" className="flex-grow">
          <div>
        Current value: {name2}
          </div>
          <input type="text" value={name2} onChange={e => setName2(e.target.value)} />
        </RoughCard>
      </div>
    </div>
  )
}

export default UseLocalStorageExample;
