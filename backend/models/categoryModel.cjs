const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


categorySchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'],
});

module.exports = mongoose.model('category', categorySchema);
