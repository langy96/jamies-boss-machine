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

module.exports = app;
