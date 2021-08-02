const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomUsersSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'gamerooms',
    },
    point: Number,
  },
  {
    timestamps: true, //Auto create createdAt & updatedAt
  },
);

module.exports = mongoose.model('roomusers', roomUsersSchema);
