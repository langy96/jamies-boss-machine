// server/meetings.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // same folder

// GET all meetings
router.get('/', (req, res) => {
  res.send(db.getAllFromDatabase('meetings'));
});

// POST a new meeting (auto-create)
router.post('/', (req, res) => {
  const newMeeting = {
    id: String(Date.now()), // simple unique ID
    time: '12:00',
    date: new Date().toISOString().split('T')[0],
    day: new Date().toLocaleString('en-US', { weekday: 'long' }),
    note: 'New meeting note',
  };
  const meeting = db.addToDatabase('meetings', newMeeting);
  res.status(201).send(meeting);
});

// DELETE all meetings
router.delete('/', (req, res) => {
  db.db.meetings = []; // clear the array directly
  res.sendStatus(204);
});

module.exports = router;
