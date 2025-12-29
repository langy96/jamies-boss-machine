// server/ideas.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Correct path since both files are in server/
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// GET all ideas
router.get('/', (req, res) => {
  res.send(db.getAllFromDatabase('ideas'));
});

// POST a new idea
router.post('/', checkMillionDollarIdea, (req, res) => {
  const idea = db.addToDatabase('ideas', req.body);
  res.status(201).send(idea);
});

// GET idea by id
router.get('/:ideaId', (req, res) => {
  const idea = db.getFromDatabaseById('ideas', req.params.ideaId);
  if (!idea) return res.sendStatus(404);
  res.send(idea);
});

// PUT / update idea
router.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
  const id = req.params.ideaId;
  if (req.body.id !== id) return res.sendStatus(400);

  const updated = db.updateInstanceInDatabase('ideas', req.body);
  if (!updated) return res.sendStatus(404);
  res.send(updated);
});

// DELETE idea
router.delete('/:ideaId', (req, res) => {
  const deleted = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (!deleted) return res.sendStatus(404);
  res.sendStatus(204);
});

module.exports = router;
