const express = require('express');
const minionsRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

// GET all
minionsRouter.get('/', (req, res) => {
  res.send(getAllFromDatabase('minions'));
});

// POST
minionsRouter.post('/', (req, res) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

// GET by id
minionsRouter.get('/:minionId', (req, res) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (!minion) return res.sendStatus(404);
  res.send(minion);
});

// PUT
minionsRouter.put('/:minionId', (req, res) => {
  if (req.body.id !== req.params.minionId) return res.sendStatus(400);
  const updated = updateInstanceInDatabase('minions', req.body);
  if (!updated) return res.sendStatus(404);
  res.send(updated);
});

// DELETE
minionsRouter.delete('/:minionId', (req, res) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (!deleted) return res.sendStatus(404);
  res.sendStatus(204);
});

module.exports = minionsRouter;
