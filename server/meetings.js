// meetings.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all
router.get('/', (req, res) => {
  res.send(db.getAllMeetings());
});

// POST (auto-create)
router.post('/', (req, res) => {
  const meeting = db.addMeeting({ name: 'New Meeting', time: '12:00' });
  res.status(201).send(meeting);
});

// DELETE all
router.delete('/', (req, res) => {
  db.deleteAllMeetings();
  res.sendStatus(204);
});

module.exports = router;
