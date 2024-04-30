import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import { createBaseObject, checkIfDateIsToday } from './fitness-helpers.mjs';
import { writeJsonFile } from '../json-writer.mjs';

const router = express.Router();

const FITNESS_PATH = 'server/data/fitness.json';

const getAllData = async () => {
  const dataRaw = await readFile(FITNESS_PATH, 'utf8');
  const data = JSON.parse(dataRaw);
  const todaysEntry = data.entries.filter(entry => checkIfDateIsToday(entry.date))
  const object = {
    data,
    todaysEntry
  }
  if (todaysEntry.length === 0) {
    object.todaysEntry = createBaseObject();
  } else {
    object.todaysEntry = todaysEntry[0];
  }
  return object;
}

const updateData = async (todaysEntry) => {
  const { data } = await getAllData();
  if (data.entries.some(entry => checkIfDateIsToday(entry.date))) {
    const updatedData = {
      ...data,
      entries: data.entries.map(entry => {
        if (checkIfDateIsToday(entry.date)) {
          return todaysEntry;
        }
        return entry;
      })
    }
    await writeJsonFile(FITNESS_PATH, updatedData);
  } else {
    const updatedData = {
      ...data,
      entries: [
        ...data.entries,
        todaysEntry
      ]
    }
    await writeJsonFile(FITNESS_PATH, updatedData);
  }
  
}

// Define a route for '/fitness/load-data'
router.get('/load-data', async (req, res) => {
  console.log('Loading data from fitness app')
  try {
    const { todaysEntry } = await getAllData();
    res.json(todaysEntry);
  } catch(error) {
    res.status(500).send('Error reading data file');
  }
});

// Define a route for '/fitness/save-data'
router.post('/save-data', async (req, res) => {
  const todaysEntry = req.body;
  console.log('Saving data to fitness app')
  try {
    await updateData(todaysEntry);
    res.send('Data saved to fitness app');
  } catch(error) {
    res.status(500).send('Error saving data to file');
  }
  
});

// You can add more routes here

export default router;
