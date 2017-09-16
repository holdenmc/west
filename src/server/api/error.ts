'use strict';

import { RequestHandler, ErrorRequestHandler } from 'express';

let errorHandler: ErrorRequestHandler = function (err, req, res, next) {
  console.error({
    url: req.originalUrl,
    error: (err instanceof Error) ? err.toString() : err,
    stack: err.stack,
    status: res.statusCode
  });

  if (!res.statusCode || res.statusCode < 400){
    res.status(500);
  }
  res.json(err);
};

let fourOhFour: RequestHandler = function (req, res, next) {
  console.warn(`404 ${req.originalUrl}`);

  res.sendStatus(404);
}

export { errorHandler, fourOhFour };