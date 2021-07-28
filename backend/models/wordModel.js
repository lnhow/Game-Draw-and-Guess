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
    timestamps: true, //Auto create createdAt & updatedAt
  },
);

//Plugins
//Soft delete plugin: create (deleted & deletedAt) & handle soft delete
wordSchema.plugin(mongoose_delete, { deletedAt: true });

const word = mongoose.model('word', wordSchema);

module.exports = word;
