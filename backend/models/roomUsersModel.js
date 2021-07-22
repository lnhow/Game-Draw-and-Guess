const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const gameroomsSchema = new Schema(
  {
    _id: uuid,
    userId: uuid,
    roomId: uuid,
    point: Number,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true },
);

const gameroom = mongoose.model('gameroom', gameroomsSchema);

module.exports = gameroom;
