require('dotenv').config(); //alt: require('dotenv').config({path: whaterverPath/.env})
const port = process.env.PORT || 80;

const cors = require('cors');
const fetch = require('node-fetch');
const express = require('express');
const app = express();

app.use(cors());

app.get('/n2yo', async (req, res) => {
  
  const api = req.query.api;
  let url = `https://api.n2yo.com/rest/v1/satellite/${api}`;
  
  if (api === 'above') {
    url += `/${req.query.lat}/${req.query.lon}/${req.query.alt}/${req.query.rad}/${req.query.cat}/&apiKey=${req.query.apikey}`;
  }
  if (api === 'positions') {
    url += `/${req.query.id}/${req.query.lat}/${req.query.lon}/${req.query.alt}/${req.query.dur * 60}/&apiKey=${req.query.apikey}`
  }

  const response = await fetch(url, { 'method': 'GET' })
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