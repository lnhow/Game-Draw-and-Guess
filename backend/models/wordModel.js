const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const wordSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
    },
    word: String,
  },
  {
    timestamps: true,
  },
);


wordSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'],
});

const word = mongoose.model('word', wordSchema);

module.exports = word;
