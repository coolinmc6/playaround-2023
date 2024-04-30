import express from 'express';
import cors from 'cors';
import { csvWriter, getAllData } from './csv-writer.mjs';
import fitnessRouter from './routes/fitness.mjs'

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

const convertLinks = (links) => {
  // links: id,text,type,a_href,a_target,a_title,description
  return links.map((link) => {
    return {
      ...link,
      text: link['link-title'],
      type: link['link-type'],
      a_href: link['link-url'],
      a_target: '_blank',
      a_title: link['link-title'],
      description: link['link-description'],
    }
  })
}

const parseContent = (body) => {
  return {
    title: body?.title ?? '',
    topic: body?.topic ?? '',
    subtopic: body?.subtopic ?? '',
    content1: body?.content1 ?? '',
    content2: body?.content2 ?? '',
    content3: body?.content3 ?? '',
    content4: body?.content4 ?? '',
    content5: body?.content5 ?? '',
    content6: body?.content6 ?? '',
    content7: body?.content7 ?? '',
    content8: body?.content8 ?? '',
    content9: body?.content9 ?? '',
    content10: body?.content10 ?? '',
  }
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

// Fitness routes
app.use('/fitness', fitnessRouter);

app.get('/', (req, res) => {
  res.send(JSON.stringify(object))
})

app.post('/', (req, res) => {
  res.send('Data received')
})

app.get('/get-data', (req, res) => {
  getAllData().then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send(err)
  })
})

// links: id,text,type,a_href,a_target,a_title,description
// citations: id,text,link_id,paragraph_id,fact_id,comments
// paragraphs: id,active,type,title,credit,topic,subtopic,content1,content2,content3,content4,content5,content6,content7,content8,content9,content10

app.post('/save-data', (req, res) => {
  const bodyContent = parseContent(req.body)
  
  const content = [
    {
      id: generateRandomId(ID_LENGTH, 'cont'),
      ...bodyContent
    }]
  csvWriter('content', content)
  
  if (!req.body?.links[0]?.['link-url']) {
    res.send('Data saved')
    return
  }
  const links = convertLinks(req.body.links.map((link) => {
    return {
      id: generateRandomId(ID_LENGTH, 'link'),
      target: '_blank',
      ...link,
    }
  }))

  console.log({links})

  const citations = links.map((link) => {
    return {
      id: generateRandomId(ID_LENGTH, 'cite'),
      paragraph_id: content[0].id,
      link_id: link.id,
    }
  })
  csvWriter('links', links)
  csvWriter('citations', citations)


  res.send('Data saved')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
