const express = require('express');
const app = express();
const port = 8000;
let path = require('path');

app.use(express.static('public'));
//app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});