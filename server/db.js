// server/db.js

// In-memory "database"
const db = {
  minions: [
    { id: '1', name: 'Bob', title: 'Worker', weaknesses: '', salary: 1000 },
    { id: '2', name: 'Kevin', title: 'Worker', weaknesses: '', salary: 1500 },
  ],
  ideas: [
    { id: '1', name: 'New Idea', description: 'Test idea', weeklyRevenue: 1000000, numWeeks: 1 },
  ],
  meetings: [],
  work: [
    { id: '1', title: 'Work1', hours: 8, minionId: '2' },
    { id: '2', title: 'Work2', hours: 10, minionId: '2' },
  ],
};

// Generic helper functions
function getAllFromDatabase(table) {
  return db[table];
}

function getFromDatabaseById(table, id) {
  return db[table].find((item) => item.id === id);
}

function addToDatabase(table, item) {
  db[table].push(item);
  return item;
}

function updateInstanceInDatabase(table, updatedItem) {
  const idx = db[table].findIndex((item) => item.id === updatedItem.id);
  if (idx === -1) return null;
  db[table][idx] = updatedItem;
  return updatedItem;
}

function deleteFromDatabasebyId(table, id) {
  const idx = db[table].findIndex((item) => item.id === id);
  if (idx === -1) return false;
  db[table].splice(idx, 1);
  return true;
}

module.exports = {
  db,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
};
