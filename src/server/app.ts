const bodyParser = require('body-parser');

import * as express from 'express';
import router from './api/index';
import { errorHandler, fourOhFour } from './api/error';

const app = express();

app.use(bodyParser.json());

app.use('/api', router);

app.use('/*', fourOhFour);
app.use(errorHandler);

export { app };