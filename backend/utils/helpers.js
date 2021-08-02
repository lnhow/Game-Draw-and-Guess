import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export function subcribeCallback(callback) {
  return callback
    ? callback
    : () => {
        //Empty function so it won't raise an error when callback isn't passed
      };
}

export function isValidRoomId(str) {
  return ObjectId.isValid(str) && new ObjectId(str).toHexString() === str;
}
