import express from 'express';
import cors from 'cors';
import router from './api/index.js';
import {notFoundHandler, errorHandler} from './middlewares/error-handlers.js';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());

// needed for reading request body in JSON format
app.use(express.json());
// Parses URL-encoded form data (like HTML forms)
app.use(express.urlencoded({extended: true}));

// All requests starting with /api/v1/ go to the api router (api/index.js)
app.use('/api/v1', router);

// Default for all routes not handled by routers above
app.use(notFoundHandler);
// Error handler is the last middleware in the chain
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
