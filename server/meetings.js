const express = require('express');
const meetingsRouter = express.Router();

const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
  createMeeting
} = require('./db');

// GET all
meetingsRouter.get('/', (req, res) => {
  res.send(getAllFromDatabase('meetings'));
});

// POST (auto-create)
meetingsRouter.post('/', (req, res) => {
  const meeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(meeting);
});

// DELETE all
meetingsRouter.delete('/', (req, res) => {
  deleteAllFromDatabase('meetings');
  res.sendStatus(204);
});

module.exports = meetingsRouter;
