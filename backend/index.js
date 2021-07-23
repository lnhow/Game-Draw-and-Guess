/**
 * This is the main file that start running everything
 */
import app from './server.js';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT ? process.env.PORT : process.env.DEFAULT_PORT;

app.listen(port, () => {
  console.log(`Backend server started. Listening on port ${port}`);
});
