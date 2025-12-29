// minions.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all
router.get('/', (req, res) => {
  res.send(db.getAllMinions());
});

// POST
router.post('/', (req, res) => {
  const newMinion = db.addMinion(req.body);
  res.status(201).send(newMinion);
});

// GET by id
router.get('/:minionId', (req, res) => {
  const minion = db.getMinionById(Number(req.params.minionId));
  if (!minion) return res.sendStatus(404);
  res.send(minion);
});

// PUT
router.put('/:minionId', (req, res) => {
  const id = Number(req.params.minionId);
  if (req.body.id !== id) return res.sendStatus(400);
  const updated = db.updateMinion(id, req.body);
  if (!updated) return res.sendStatus(404);
  res.send(updated);
});

// DELETE
router.delete('/:minionId', (req, res) => {
  const deleted = db.deleteMinion(Number(req.params.minionId));
  if (!deleted) return res.sendStatus(404);
  res.sendStatus(204);
});

module.exports = router;
