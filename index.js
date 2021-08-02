require('dotenv').config(); //alt: require('dotenv').config({path: whaterverPath/.env})
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const N2YO_API_KEY = process.env.N2YO_API_KEY;

const cors = require('cors');
const fetch = require('node-fetch');
const express = require('express');
const app = express();

app.use(cors());

app.get('/n2yo', async (req, res) => {
  const url = `https://api.n2yo.com/rest/v1/satellite/${req.query.api}/${req.query.latitude}/${req.query.longitude}/${req.query.altitude}/${req.query.radius}/${req.query.category}/&apiKey=${N2YO_API_KEY}`;
  const options = { 'method': 'GET' };
  const response = await fetch(url, options)
   .then(res => res.json())
   .catch(e => { 
     console.error({
      'message': 'error occured in fetch()',
      error: e
    }); 
   }); 

  res.send(response);
});

app.listen(PORT, HOST, () => {
  console.log(`NodeJsServerForN2YO is listening to ${HOST}:${PORT}`);
});