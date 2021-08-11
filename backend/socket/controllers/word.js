import wordModel from '../../models/wordModel.cjs';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
export const DEFAULT_WORD = {
  _id: null,
  word: 'duck',
};

/**
 * Randomize a word in a category
 * @param {String} categoryId The id of the category
 * @returns {{
 *  id: String,
 *  word: String
 * }} Simple representation of the randomized word,
 *    fallback to DEFAULT_WORD if not found
 */
export const getRandomWord = async (categoryId) => {
  const count = await wordModel.countDocuments({
    categoryId: ObjectId(categoryId),
  });
  if (!count) {
    return DEFAULT_WORD;
  }

  const rand = Math.floor(Math.random() * count);
  const word = await wordModel
    .findOne({
      categoryId: ObjectId(categoryId),
    })
    .skip(rand);
  if (!word) {
    return DEFAULT_WORD;
  }

  return {
    id: word._id.toString(),
    word: word.word,
  };
};
