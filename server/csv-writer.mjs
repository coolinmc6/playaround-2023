import fs from 'fs';
import csvParser from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

const contentPath = 'server/data/content.csv';
const linksPath = 'server/data/links.csv';
const citationsPath = 'server/data/citations.csv';


const contentWriter = createObjectCsvWriter({
  path: contentPath,
  append: true,
  header: [
    {id: 'id', title: 'ID'},
    {id: 'title', title: 'Title'},
    {id: 'topic', title: 'Topic'},
    {id: 'subTopic', title: 'SubTopic'},
    {id: 'content1', title: 'Content1'},
    {id: 'content2', title: 'Content2'},
  ]
});

const linksWriter = createObjectCsvWriter({
  path: linksPath,
  append: true,
  header: [
    {id: 'id', title: 'ID'},
    {id: 'text', title: 'Text'},
    {id: 'type', title: 'Type'},
    {id: 'href', title: 'Href'},
    {id: 'target', title: 'Target'},
    {id: 'title', title: 'Title'},
    {id: 'description', title: 'Description'},
  ]
});

const citationsWriter = createObjectCsvWriter({
  path: citationsPath,
  append: true,
  header: [
    {id: 'id', title: 'ID'},
    {id: 'text', title: 'Text'},
    {id: 'paragraph_id', title: 'Paragraph ID'},
    {id: 'link_id', title: 'Link ID'},
    {id: 'fact_id', title: 'Fact ID'},
    {id: 'comments', title: 'Comments'},
  ]
});

const csvWriter = (type, data) => {
  let writer;
  switch (type) {
    case 'content':
      writer = contentWriter;
      break;
    case 'links':
      writer = linksWriter;
      break;
    case 'citations':
      writer = citationsWriter;
      break;
    default:
      return Promise.reject('Invalid type');
  }

  // must be an array of objects like this:
  // const data = [
  //   {
  //     title: 'Example Title',
  //     topic: 'Example Topic',
  //     subTopic: 'Example SubTopic',
  //     content1: 'Example Content1',
  //     content2: 'Example Content2',
  //     // Specify up to content10 as needed
  //   }
  // ];

  return writer.writeRecords(data)
    .then(() => {
        console.log('Row was added to the CSV file');
    })
    .catch(err => {
        console.error('Error writing to CSV file', err);
    });
}

const readCsv = (type) => {
  let filePath;
  switch (type) {
    case 'content':
      filePath = contentPath;
      break;
    case 'links':
      filePath = linksPath;
      break;
    case 'citations':
      filePath = citationsPath;
      break;
    default:
      return Promise.reject('Invalid type');
  }
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

const getAllData = async () => {
  const content = await readCsv('content');
  const links = await readCsv('links');
  const citations = await readCsv('citations');
  return {
    content,
    links,
    citations,
  };
}

export {
  csvWriter,
  readCsv,
  getAllData
}
