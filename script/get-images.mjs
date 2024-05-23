import fs, { write } from 'fs';
import path from 'path';

import { PRODUCTIVITY_BASE_PATH, PRODUCTIVITY_OUTPUT_PATH } from './constants.mjs';
import { dir } from 'console';

const HOUSE_BASE_PATH = './public/assets/house';
const HOUSE_OUTPUT_PATH = './public/assets/house-images.json';

const houseImageDirectory = {
  outdoorKitchen: {
    path: `${HOUSE_BASE_PATH}/outdoor-kitchen`,
    images: []
  },
  other: {
    path: `${HOUSE_BASE_PATH}/other`,
    images: [],
  },
  bedroom: {
    path: `${HOUSE_BASE_PATH}/bedroom`,
    images: [],
  },
}

const getImages = (dirPath) => {
  const images = [];

  const cleanedPath = dirPath.replace('./public', '');

  fs.readdirSync(dirPath).forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'].includes(ext)) {
      const publicPath = path.join(cleanedPath, file);
      images.push(publicPath);
    }
  });

  return images;
};

const writeJson = (data, outputPath) => {
  try {
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`JSON file saved to ${outputPath}`);
  } catch (err) {
    console.log('Error writing JSON file:', err);
  }
}

const getHouseImages = () => {
  Object.keys(houseImageDirectory).forEach((key) => {
    houseImageDirectory[key].images = getImages(houseImageDirectory[key].path);
  });

  writeJson(houseImageDirectory, HOUSE_OUTPUT_PATH);
}

getHouseImages();

const getProductivityImages = () => {
  const productivityImages = getImages(PRODUCTIVITY_BASE_PATH);
  writeJson(productivityImages, PRODUCTIVITY_OUTPUT_PATH);
}

getProductivityImages();
