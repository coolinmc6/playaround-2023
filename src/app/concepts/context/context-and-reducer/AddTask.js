"use client";

import { useState, useContext } from 'react';
import { TasksDispatchContext } from './TasksContext.tsx';
import { generateRandomId } from '@/app/lib/helpers';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          dispatch({
            type: 'added',
            text,
            id: generateRandomId(),
          });
        }}>
        Add
      </button>
    </>
  );
}
 