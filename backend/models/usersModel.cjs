const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    username: String,
    accountId: {
      type: mongoose.Types.ObjectId,
      ref: 'accounts',
    },
    avatar: String,
    createdAt: Date,
    isDeleted: Boolean,
    deletedAt: Date,
  },
  { timestamps: true },
);

usersSchema.pre('save', async function (next) {
  try {
    if (!this.isModified() || this.isNew) return next();
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

usersSchema.post('save', async function (next) {
  try {
    console.log('Call after saving account');
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('user', usersSchema);
