// ideas.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

// GET all
router.get('/', (req, res) => {
  res.send(db.getAllIdeas());
});

// POST
router.post('/', checkMillionDollarIdea, (req, res) => {
  const idea = db.addIdea(req.body);
  res.status(201).send(idea);
});

// GET by id
router.get('/:ideaId', (req, res) => {
  const idea = db.getIdeaById(Number(req.params.ideaId));
  if (!idea) return res.sendStatus(404);
  res.send(idea);
});

// PUT
router.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
  const id = Number(req.params.ideaId);
  if (req.body.id !== id) return res.sendStatus(400);
  const updated = db.updateIdea(id, req.body);
  if (!updated) return res.sendStatus(404);
  res.send(updated);
});

// DELETE
router.delete('/:ideaId', (req, res) => {
  const deleted = db.deleteIdea(Number(req.params.ideaId));
  if (!deleted) return res.sendStatus(404);
  res.sendStatus(204);
});

module.exports = router;
