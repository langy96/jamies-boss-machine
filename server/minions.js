// server/minions.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // same folder

// GET all minions
router.get('/', (req, res) => {
  res.send(db.getAllFromDatabase('minions'));
});

// POST a new minion
router.post('/', (req, res) => {
  const newMinion = {
    id: String(Date.now()), // unique ID
    name: req.body.name || '',
    title: req.body.title || '',
    weaknesses: req.body.weaknesses || '',
    salary: req.body.salary || 0,
  };
  const addedMinion = db.addToDatabase('minions', newMinion);
  res.status(201).send(addedMinion);
});

// GET minion by ID
router.get('/:minionId', (req, res) => {
  const minion = db.getFromDatabaseById('minions', req.params.minionId);
  if (!minion) return res.sendStatus(404);
  res.send(minion);
});

// PUT (update) minion
router.put('/:minionId', (req, res) => {
  const id = req.params.minionId;
  if (req.body.id !== id) return res.sendStatus(400);

  const updatedMinion = {
    id,
    name: req.body.name || '',
    title: req.body.title || '',
    weaknesses: req.body.weaknesses || '',
    salary: req.body.salary || 0,
  };

  const result = db.updateInstanceInDatabase('minions', updatedMinion);
  if (!result) return res.sendStatus(404);
  res.send(result);
});

// DELETE minion
router.delete('/:minionId', (req, res) => {
  const deleted = db.deleteFromDatabasebyId('minions', req.params.minionId);
  if (!deleted) return res.sendStatus(404);
  res.sendStatus(204);
});

module.exports = router;
