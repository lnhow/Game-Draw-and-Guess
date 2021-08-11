import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export function subcribeCallback(callback) {
  return typeof callback === 'function'
    ? callback
    : () => {
        //Empty function so it won't raise an error when callback is not a function
      };
}

export function isValidRoomId(str) {
  return ObjectId.isValid(str) && new ObjectId(str).toHexString() === str;
}
