import { RequestHandler, Router } from 'express';
import {} from 'gameLogic';

const router = Router();

const ping: RequestHandler = (req, res, next) => { res.send('pong'); }

export default router
  // Health check
  .get('/ping', ping);


