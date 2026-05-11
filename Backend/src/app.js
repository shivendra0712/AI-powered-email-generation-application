const express = require('express');
const router = require('../src/routes/ai.route');
const app = express();
const cors = require('cors');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.Frontend_URL,
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/ai', router);

module.exports = app;



