import { init } from './connection';
import express from 'express';
import { register as registerUserRoutes } from './routes/user';
import { register as registerGameRoutes } from './routes/game';

// Connect to database
init();

// Initialize express server
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

registerUserRoutes(app);
registerGameRoutes(app);
app.get('/', (req, res) => res.send('Hello World!'));

