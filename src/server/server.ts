'use strict';

import { app } from './app';

const port = 3000;

const server = app.listen(port, () => {
  console.info(`serving app on: ${port}`);
});
