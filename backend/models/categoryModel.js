const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    _categoryId: ObjectId,
    categoryName: String,
    createdAt: Date,
    isDeleted: Boolean,
    deletedAt: Date,
  },
  { timestamps: true },
);

const category = mongoose.model('category', categorySchema);

module.exports = category;
