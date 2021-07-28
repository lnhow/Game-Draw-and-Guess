const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const gameroomSchema = new Schema(
  {
    hostUserId: {
      type: Schema.Types.ObjectId,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
    },
    roomName: String,
    maxPlayer: Number,
    timePerRound: Number,
    roomStatus: String,
  },
  {
    timestamps: true, //Auto create createdAt & updatedAt
  },
);

//Plugins
//Soft delete plugin: create (deleted & deletedAt) & handle soft delete
gameroomSchema.plugin(mongoose_delete, { deletedAt: true });

module.exports = mongoose.model('gameroom', gameroomSchema);
