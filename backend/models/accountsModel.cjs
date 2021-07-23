const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const usersModel = require('./usersModel.cjs');

const accountsSchema = new Schema(
  {
    email: String,
    password: String,
    role: Number,
    isBlocked: Boolean,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true },
);

accountsSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  const tenMinute = 10 * 60 * 1000;
  this.passwordResetExpires = Date.now() + tenMinute;

  return resetToken;
};

accountsSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password') || this.isNew) return next();
    const user = usersModel.findOne({ _accountId: this._accountId });
    user.updatedAt = Date.now() - 1000;

    next();
  } catch (error) {
    next(error);
  }
});

accountsSchema.post('save', async function (next) {
  try {
    console.log('Call after saving account');
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('account', accountsSchema);
