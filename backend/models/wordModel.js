const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const wordSchema = new Schema(
  {
    _wordId: uuid,
    category: Object,
    word: String,
    createdAt: Date,
    isDeleted: Boolean,
    deletedAt: Date,
  },
  { timestamps: true },
);

const word = mongoose.model('word', wordSchema);

module.exports = word;
