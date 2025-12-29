// db.js
// In-memory fake database for Jamie's Boss Machine

let minions = [
  { id: 1, name: 'Test Minion', title: 'Worker' },
];

let ideas = [
  { id: 1, name: 'Test Idea', description: 'Idea desc', weeklyRevenue: 100, numWeeks: 10 },
];

let meetings = [
  { id: 1, name: 'Weekly Meeting', time: '10:00' },
];

let nextMinionId = minions.length + 1;
let nextIdeaId = ideas.length + 1;
let nextMeetingId = meetings.length + 1;

const db = {
  // Minions
  getAllMinions: () => [...minions],
  getMinionById: (id) => minions.find(m => m.id === id),
  addMinion: (minion) => {
    minion.id = nextMinionId++;
    minions.push(minion);
    return minion;
  },
  updateMinion: (id, updated) => {
    const index = minions.findIndex(m => m.id === id);
    if (index === -1) return null;
    minions[index] = { ...minions[index], ...updated };
    return minions[index];
  },
  deleteMinion: (id) => {
    const index = minions.findIndex(m => m.id === id);
    if (index === -1) return false;
    minions.splice(index, 1);
    return true;
  },

  // Ideas
  getAllIdeas: () => [...ideas],
  getIdeaById: (id) => ideas.find(i => i.id === id),
  addIdea: (idea) => {
    idea.id = nextIdeaId++;
    ideas.push(idea);
    return idea;
  },
  updateIdea: (id, updated) => {
    const index = ideas.findIndex(i => i.id === id);
    if (index === -1) return null;
    ideas[index] = { ...ideas[index], ...updated };
    return ideas[index];
  },
  deleteIdea: (id) => {
    const index = ideas.findIndex(i => i.id === id);
    if (index === -1) return false;
    ideas.splice(index, 1);
    return true;
  },

  // Meetings
  getAllMeetings: () => [...meetings],
  addMeeting: (meeting) => {
    meeting.id = nextMeetingId++;
    meetings.push(meeting);
    return meeting;
  },
  deleteAllMeetings: () => {
    meetings = [];
  },

  // Reset db for testing
  reset: () => {
    minions = [{ id: 1, name: 'Test Minion', title: 'Worker' }];
    ideas = [{ id: 1, name: 'Test Idea', description: 'Idea desc', weeklyRevenue: 100, numWeeks: 10 }];
    meetings = [{ id: 1, name: 'Weekly Meeting', time: '10:00' }];
    nextMinionId = minions.length + 1;
    nextIdeaId = ideas.length + 1;
    nextMeetingId = meetings.length + 1;
  }
};

module.exports = db;
