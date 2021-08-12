import mongoose from 'mongoose';
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
    wordDrawId: {
      type: Schema.Types.ObjectId,
      ref: 'words',
    },
  },
  {
    timestamps: true, //Auto create createdAt & updatedAt
  },
);

const RoomUsersModel = mongoose.model('roomusers', roomUsersSchema);

export default RoomUsersModel;
