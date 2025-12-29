const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRouter = require('./server/api');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

// mount router
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Jamie's Boss Machine API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 50px;
            background-color: #f4f4f9;
            color: #333;
          }
          h1 {
            color: #2c3e50;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            margin: 10px 0;
          }
          a {
            text-decoration: none;
            color: #2980b9;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to Jamie's Boss Machine API!</h1>
        <p>Available API endpoints:</p>
        <ul>
          <li><a href="/api/minions">/api/minions</a></li>
          <li><a href="/api/ideas">/api/ideas</a></li>
          <li><a href="/api/meetings">/api/meetings</a></li>
        </ul>
      </body>
    </html>
  `);
});

module.exports = app;
