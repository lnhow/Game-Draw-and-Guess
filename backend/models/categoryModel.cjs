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
    timestamps: true, //Auto create createdAt & updatedAt
  },
);

//Plugins
//Soft delete plugin: create (deleted & deletedAt) & handle soft delete
categorySchema.plugin(mongoose_delete, { deletedAt: true });

module.exports = mongoose.model('category', categorySchema);
