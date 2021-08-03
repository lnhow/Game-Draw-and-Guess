import wordModel from '../../models/wordModel.cjs';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
const DEFAULT_WORD = 'duck';

export const getRandomWord = async (categoryId) => {
  const count = await wordModel.countDocuments({
    categoryId: ObjectId(categoryId),
  });
  if (!count) {
    return DEFAULT_WORD;
  }

  const rand = Math.floor(Math.random() * count);
  const word = await wordModel.findOne().skip(rand);
  if (!word) {
    return DEFAULT_WORD;
  }

  return word.word;
};
