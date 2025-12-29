const expect = require('chai').expect;
const request = require('supertest');
const path = require('path');

const app = require(path.join(__dirname, '../app')); // load your app
const fakeDb = require(path.join(__dirname, '../server/db.js'));
const checkMillionDollarIdea = require(path.join(__dirname, '../server/checkMillionDollarIdea.js'));

describe('/api/minions routes', function() {

  describe('GET /api/minions', function() {
    it('returns an array', function() {
      return request(app)
        .get('/api/minions')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an.instanceOf(Array);
        });
    });

    it('returns all minions', function() {
      return request(app)
        .get('/api/minions')
        .expect(200)
        .then(res => {
          const allMinions = fakeDb.getAllFromDatabase('minions');
          expect(res.body.length).to.equal(allMinions.length);
        });
    });
  });

  describe('GET /api/minions/:minionId', function() {
    it('returns a single minion object', function() {
      return request(app)
        .get('/api/minions/1')
        .expect(200)
        .then(res => {
          const minion = res.body;
          expect(minion).to.be.an('object');
          expect(minion).to.not.be.an.instanceOf(Array);
        });
    });

    it('returns correct minion properties', function() {
      return request(app)
        .get('/api/minions/1')
        .expect(200)
        .then(res => {
          const minion = res.body;
          ['id','name','title','weaknesses','salary'].forEach(prop => {
            expect(minion).to.have.property(prop);
          });
        });
    });

    it('returns 404 for invalid ID', function() {
      return request(app)
        .get('/api/minions/9999')
        .expect(404);
    });

    it('returns 404 for non-numeric ID', function() {
      return request(app)
        .get('/api/minions/notAnId')
        .expect(404);
    });
  });

  describe('POST /api/minions', function() {
    it('creates a new minion', function() {
      const newMinion = { name:'Test', title:'Worker', salary:5000, weaknesses:'none' };
      return request(app)
        .post('/api/minions')
        .send(newMinion)
        .expect(201)
        .then(res => {
          expect(res.body).to.include.keys('id','name','title','salary','weaknesses');
        });
    });
  });

  describe('PUT /api/minions/:minionId', function() {
    it('updates a minion', function() {
      return request(app)
        .get('/api/minions/1')
        .then(res => {
          const updated = Object.assign({}, res.body, {name:'Updated'});
          return request(app)
            .put('/api/minions/1')
            .send(updated)
            .expect(200)
            .then(res2 => {
              expect(res2.body.name).to.equal('Updated');
            });
        });
    });
  });

  describe('DELETE /api/minions/:minionId', function() {
    it('deletes a minion', function() {
      return request(app)
        .post('/api/minions')
        .send({name:'ToDelete', title:'Temp', salary:1, weaknesses:'none'})
        .then(res => {
          const id = res.body.id;
          return request(app)
            .delete(`/api/minions/${id}`)
            .expect(204);
        });
    });
  });

});

// IDEA routes
describe('/api/ideas routes', function() {
  describe('GET /api/ideas', function() {
    it('returns all ideas', function() {
      return request(app)
        .get('/api/ideas')
        .expect(200)
        .then(res => {
          const allIdeas = fakeDb.getAllFromDatabase('ideas');
          expect(res.body.length).to.equal(allIdeas.length);
        });
    });
  });

  describe('POST /api/ideas', function() {
    it('rejects ideas under $1M', function() {
      return request(app)
        .post('/api/ideas')
        .send({name:'Fail', description:'', numWeeks:1, weeklyRevenue:1})
        .expect(400);
    });

    it('accepts profitable ideas', function() {
      return request(app)
        .post('/api/ideas')
        .send({name:'Win', description:'', numWeeks:1000000, weeklyRevenue:1})
        .expect(201);
    });
  });
});

// checkMillionDollarIdea middleware unit tests
describe('checkMillionDollarIdea middleware', function() {
  let req, res, nextCalled;

  beforeEach(() => {
    req = {body:{}};
    res = {
      status: null,
      sendStatus: function(code) { this.status=code; return this; },
    };
    nextCalled = false;
  });

  it('blocks under $1M ideas', function() {
    req.body = {numWeeks:4, weeklyRevenue:2};
    checkMillionDollarIdea(req,res,() => nextCalled=true);
    expect(res.status).to.equal(400);
    expect(nextCalled).to.be.false;
  });

  it('allows profitable ideas', function() {
    req.body = {numWeeks:1000000, weeklyRevenue:1};
    checkMillionDollarIdea(req,res,() => nextCalled=true);
    expect(nextCalled).to.be.true;
  });
});
