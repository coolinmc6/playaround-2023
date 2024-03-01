import { useReducer, createContext, type Dispatch } from 'react';

export const TasksContext = createContext<any[] | null>(null);
export const TasksDispatchContext = createContext<Dispatch<any> | null>(null);

import { generateRandomId } from '@/app/lib/helpers.js'


const initialTasks = [
  { id: generateRandomId(), text: 'Philosopher’s Path', done: true },
  { id: generateRandomId(), text: 'Visit the temple', done: false },
  { id: generateRandomId(), text: 'Drink matcha', done: false }
];

export function TasksProvider({ children }: { children: any}) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
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
