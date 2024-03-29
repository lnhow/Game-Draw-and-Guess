/**
 * This file is used to setup server
 */
import express from 'express';
import cors from 'cors';
import mainRoute from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//Connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connect to DB successfully');
  });
const app = express();

const corsOptions = {
  exposedHeaders: 'auth-token',
};

app.use(cors(corsOptions)); // Allow Cross Origin Resource Sharing
app.use(express.json()); // Accept JSON request

app.use('/', mainRoute);

// Route not exist
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'not found',
  });
});

export default app;
