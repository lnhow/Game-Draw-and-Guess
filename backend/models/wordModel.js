const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const wordSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
    },
    word: {
      type: Schema.Types.String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);


wordSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'],
});

const words = mongoose.model('words', wordSchema);

module.exports = words;
