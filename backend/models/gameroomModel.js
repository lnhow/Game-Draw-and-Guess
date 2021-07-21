const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const gameroomsSchema = new Schema(
  {
    _roomId: uuid,
    hostUserId: uuid,
    roomName: String,
    maxPlayer: Number,
    timePerRound: Number,
    roomStatus: String,
    createdAt: Date,
    isDeleted: Boolean,
    deletedAt: Date,
  },
  { timestamps: true },
);

const gameroom = mongoose.model('gameroom', gameroomsSchema);

module.exports = gameroom;
