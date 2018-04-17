import { RequestHandler, Router } from 'express';
import {} from 'gameLogic';
import { Game, Person } from '../models/connect';

const router = Router();

const ping: RequestHandler = (req, res, next) => { res.send('pong'); }

const makePerson: RequestHandler = (req, res, next) => {
  const person = new Person({
    name: {
      first: "Holden",
      last: "Test"
    },
    primaryEmail: "holden@holdentest.com",
    passcode: "tater"
  });

  person.save((err, person) => {
    res.json(person);
  });
};

export default router
  // Health check
  .get('/ping', ping)
  .get('/person', makePerson);


