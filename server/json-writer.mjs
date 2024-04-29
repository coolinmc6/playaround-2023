import { readFile, writeFile } from 'fs/promises';

export const readJsonFile = async (filePath) => {
  try {
    const dataRaw = await readFile(FITNESS_PATH, 'utf8');
    const data = JSON.parse(dataRaw);
    return data;
  } catch (error) {
    console.error('Error reading the JSON file:', error);
    throw error;
  }
}

export const writeJsonFile = async (filePath, data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2); // null and 2 are for formatting
    await writeFile(filePath, jsonData, 'utf8');
  } catch (error) {
    console.error('Error writing to the JSON file:', error);
    throw error;
  }
}
