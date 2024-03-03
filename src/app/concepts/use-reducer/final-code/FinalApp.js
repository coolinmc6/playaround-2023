"use client";

import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import '../styles.css'
// import { generateRandomId } from '@/app/lib/helpers.ts';

function generateRandomId(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const tasksReducer = (tasks, action) => {
  switch (action.type) {
  case 'added': {
    return [
      ...tasks,
      {
        id: generateRandomId(),
        text: action.text,
        done: false,
      },
    ]
  }
  case 'changed': {
    return tasks.map((t) => {
      if (t.id === action.task.id) {
        return action.task;
      } else {
        return t;
      }
    })
  }
  case 'deleted':
    return tasks.filter((t) => t.id !== action.taskId);
  default: {
    throw Error(`Unhandled action type: ${action.type}`);
  }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: generateRandomId(),
      text,
    })
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task,
    })
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted', 
      taskId,
    })
  }

  return (
    <div className="p-4 border-solid border-4 border-teal-600">
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

const initialTasks = [
  {id: generateRandomId(), text: 'Visit Kafka Museum', done: true},
  {id: generateRandomId(), text: 'Watch a puppet show', done: false},
  {id: generateRandomId(), text: 'Lennon Wall pic', done: false},
];
