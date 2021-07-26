const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const gameroomsSchema = new Schema(
  {
    _hostUserId: {
      type: String,
      default: uuid.v1,
    },
    _categoryId: {
      type: String,
      default: uuid.v1,
    },
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

module.exports = mongoose.model('gameRoom', gameroomsSchema);
