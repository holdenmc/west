import { RequestHandler, Router } from 'express';

const router = Router();

const ping: RequestHandler = (req, res, next) => { res.send('pong'); }

export default router
  // Health check
  .get('/ping', ping);

