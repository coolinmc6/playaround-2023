"use client"

import React, { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import './styles.css';
import { generateRandomId } from '@/app/lib/helpers.js'
import { TasksProvider} from './TasksContext.tsx'
import CodeBlock from '@/core/CodeBlock/CodeBlock.tsx';

export default function ContextAndReducer() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <div className="p-2">
      <TasksProvider>
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
      </TasksProvider>
    </div>
  );
}

function tasksReducer(tasks: any[], action: any) {
  switch (action.type) {
  case 'added': {
    return [...tasks, {
      id: action.id,
      text: action.text,
      done: false
    }];
  }
  case 'changed': {
    return tasks.map(t => {
      if (t.id === action.task.id) {
        return action.task;
      } else {
        return t;
      }
    });
  }
  case 'deleted': {
    return tasks.filter(t => t.id !== action.id);
  }
  default: {
    throw Error('Unknown action: ' + action.type);
  }
  }
}

const initialTasks = [
  { id: generateRandomId(), text: 'Philosopher’s Path', done: true },
  { id: generateRandomId(), text: 'Visit the temple', done: false },
  { id: generateRandomId(), text: 'Drink matcha', done: false }
];
