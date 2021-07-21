/**
 * This file is used to setup server
 */
import express from 'express';
import cors from 'cors';
import mainRoute from './routes/index.js';
import mongoose from 'mongoose';

//Connect to DB
mongoose
  .connect(
    'mongodb+srv://tien:1234567890@cluster-1.zwd9b.mongodb.net/accountDB',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    console.log('Connect successfully');
  });
const app = express();

import authRoute from './routes/auth.js';

app.use(cors()); // Allow Cross Origin Resource Sharing
app.use(express.json()); // Accept JSON request

app.use('/', mainRoute);
app.use('/api/user', authRoute);

// Route not exist
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'not found',
  });
});

export default app;
