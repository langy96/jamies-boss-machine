# jamies-boss-machine

Jamie’s Boss Machine API

This is a small Node.js/Express API I made to manage minions, ideas, and meetings. I used an in-memory database so you don’t need to set up anything extra to test it.

What it does
Minions

Get all minions: GET /api/minions

Get one minion: GET /api/minions/:id

Add a minion: POST /api/minions

Update a minion: PUT /api/minions/:id

Delete a minion: DELETE /api/minions/:id

Ideas

Get all ideas: GET /api/ideas

Get one idea: GET /api/ideas/:id

Add an idea: POST /api/ideas (must make at least $1M)

Update an idea: PUT /api/ideas/:id

Delete an idea: DELETE /api/ideas/:id

I added a check so you can’t add ideas that won’t make enough money.

Meetings

Get all meetings: GET /api/meetings

Add a meeting: POST /api/meetings

Delete all meetings: DELETE /api/meetings

How the project is set up
server/
  ├─ db.js
  ├─ minions.js
  ├─ ideas.js
  ├─ meetings.js
  ├─ checkMillionDollarIdea.js
  └─ api.js
test/
  └─ test.js
app.js
server.js
package.json
README.md

How to run it

Clone the repo:

git clone https://github.com/langy96/jamies-boss-machine.git
cd jamies-boss-machine


Install packages:

npm install


Start the server:

npm start


It will run on PORT from .env (default 4000).

Testing

I wrote some tests using Mocha and Chai. You can run them with:

npm test


They check that the API works and that things like updating, deleting, and adding items work correctly.

Example Requests

Add a Minion

POST /api/minions
Content-Type: application/json

{
  "name": "Carl",
  "title": "Worker",
  "weaknesses": "Bananas",
  "salary": 3000
}


Add an Idea

POST /api/ideas
Content-Type: application/json

{
  "name": "Super App",
  "description": "Makes money",
  "numWeeks": 50,
  "weeklyRevenue": 50000
}

Notes

This is mostly for practice and learning Express & APIs.

All data is in memory, so it resets if the server restarts.

I tried to cover all the main CRUD operations and added some basic checks (like making sure an idea is profitable).