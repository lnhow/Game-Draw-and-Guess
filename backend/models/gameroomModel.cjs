const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const gameroomSchema = new Schema(
  {
    hostUserId: {
      type: Schema.Types.ObjectId,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
    },
    roomName: {
      type: Schema.Types.String,
    },
    maxPlayer: Number,
    timePerRound: Number,
    roomStatus: String,
    isPrivate: Boolean,
  },
  {
    timestamps: true,
  },
);

gameroomSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'],
});

module.exports = mongoose.model('gameroom', gameroomSchema);
