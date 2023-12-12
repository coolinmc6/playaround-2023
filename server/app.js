const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 4000

const object = {
  data: [{
    id: 1,
    name: 'John Doe',
    email: '',
  }],
}

app.get('/', (req, res) => {
  res.send(JSON.stringify(object))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
