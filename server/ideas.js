const express = require('express');
const ideasRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// GET all
ideasRouter.get('/', (req, res) => {
  res.send(getAllFromDatabase('ideas'));
});

// POST
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
  const idea = addToDatabase('ideas', req.body);
  res.status(201).send(idea);
});

// GET by id
ideasRouter.get('/:ideaId', (req, res) => {
  const idea = getFromDatabaseById('ideas', req.params.ideaId);
  if (!idea) return res.sendStatus(404);
  res.send(idea);
});

// PUT
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
  if (req.body.id !== req.params.ideaId) return res.sendStatus(400);
  const updated = updateInstanceInDatabase('ideas', req.body);
  if (!updated) return res.sendStatus(404);
  res.send(updated);
});

// DELETE
ideasRouter.delete('/:ideaId', (req, res) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (!deleted) return res.sendStatus(404);
  res.sendStatus(204);
});

module.exports = ideasRouter;
