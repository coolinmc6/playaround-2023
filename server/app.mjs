import express from 'express';
import cors from 'cors';
import { csvWriter, getAllData } from './csv-writer.mjs';

const app = express();
app.use(express.json());
app.use(cors());

const ID_LENGTH = 16;

function generateRandomId(length = ID_LENGTH, prefix = 'id') {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length - prefix.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return prefix + '-' + result;
}

const port = 4000

const object = {
  data: [{
    id: 1,
    name: 'John Doe',
    email: '',
  }],
}

app.use((req, res, next) => {
  // console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.send(JSON.stringify(object))
})

app.post('/', (req, res) => {
  console.log('post request received')
  console.log(req.originalUrl)
  console.log(req.url)

  res.send('Data received')
})

app.get('/get-data', (req, res) => {
  console.log('get request received')
  getAllData().then(data => {
    res.send(data)
  }).catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
})

app.post('/save-data', (req, res) => {
  console.log('post request received')
  console.log(req.body)

  const content = [
    {
      id: generateRandomId(ID_LENGTH, 'cont'),
      ...req.body.content
    }]
  csvWriter('content', content)

  if (!req.body.links.url) {
    res.send('Data saved')
    return
  }
  const links = [
    {
      id: generateRandomId(ID_LENGTH, 'link'),
      target: '_blank',
      ...req.body.links
    }]
  const citations = [{
    id: generateRandomId(ID_LENGTH, 'cite'),
    paragraph_id: content[0].id,
    link_id: links[0].id,
  }]
  csvWriter('links', links)
  csvWriter('citations', citations)


  res.send('Data saved')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
