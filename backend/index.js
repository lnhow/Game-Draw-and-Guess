/**
 * This is the main file that start running everything
 */
import app from './server.js';
import dotenv from 'dotenv';

const DEFAULT_PORT = 8000;
dotenv.config();
const port = process.env.PORT ? process.env.PORT : DEFAULT_PORT;

app.listen(port, () => {
  console.log(`Backend server started. Listening on port ${port}`);
});
