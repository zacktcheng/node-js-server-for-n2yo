require('dotenv').config(); //alt: require('dotenv').config({path: whaterverPath/.env})
const port = process.env.PORT || 80;

const cors = require('cors');
const fetch = require('node-fetch');
const express = require('express');
const app = express();

app.use(cors());

app.get('/n2yo', async (req, res) => {
  
  let url = '';
  
  if (req.query.api === 'above') {
    url = `https://api.n2yo.com/rest/v1/satellite/above/${req.query.latitude}/${req.query.longitude}/${req.query.altitude}/${req.query.radius}/${req.query.category}/&apiKey=${req.query.apikey}`;
  }
  if (req.query.api === 'positions') {
    url = `https://api.n2yo.com/rest/v1/satellite/positions/${req.query.id}/${req.query.latitude}/${req.query.longitude}/${req.query.altitude}/${req.query.duration * 60}/&apiKey=${req.query.apikey}`
  }
  
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

app.listen(port, () => {
  console.log(`Node Js Server For N2YO is listening to ${port}`);
});