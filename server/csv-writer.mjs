import fs from 'fs';
import csvParser from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

const contentPath = 'server/data/content.csv';
const linksPath = 'server/data/links.csv';
const citationsPath = 'server/data/citations.csv';

// paragraphs: id,active,type,title,credit,topic,subtopic,content1,content2,content3,content4,content5,content6,content7,content8,content9,content10
const contentWriter = createObjectCsvWriter({
  path: contentPath,
  append: true,
  header: [
    {id: 'id', title: 'ID'},
    {id: 'active', title: 'Active'},
    {id: 'type', title: 'Type'},
    {id: 'title', title: 'Title'},
    {id: 'credit', title: 'Credit'},
    {id: 'topic', title: 'Topic'},
    {id: 'subTopic', title: 'SubTopic'},
    {id: 'content1', title: 'Content1'},
    {id: 'content2', title: 'Content2'},
    {id: 'content3', title: 'Content3'},
    {id: 'content4', title: 'Content4'},
    {id: 'content5', title: 'Content5'},
    {id: 'content6', title: 'Content6'},
    {id: 'content7', title: 'Content7'},
    {id: 'content8', title: 'Content8'},
    {id: 'content9', title: 'Content9'},
    {id: 'content10', title: 'Content10'},
  ]
});

// links: id,text,type,a_href,a_target,a_title,description
const linksWriter = createObjectCsvWriter({
  path: linksPath,
  append: true,
  header: [
    {id: 'id', title: 'id'},
    {id: 'text', title: 'text'},
    {id: 'type', title: 'type'},
    {id: 'a_href', title: 'a_href'},
    {id: 'a_target', title: 'a_target'},
    {id: 'a_title', title: 'a_title'},
    {id: 'description', title: 'description'},
  ]
});

// citations: id,text,link_id,paragraph_id,fact_id,comments
const citationsWriter = createObjectCsvWriter({
  path: citationsPath,
  append: true,
  header: [
    {id: 'id', title: 'ID'},
    {id: 'text', title: 'Text'},
    {id: 'link_id', title: 'Link ID'},
    {id: 'paragraph_id', title: 'Paragraph ID'},
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
      console.log(`${type}: Row was added to the CSV file`);
    })
    .catch(err => {
      console.error(`${type}: Error writing to CSV file`, err);
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
