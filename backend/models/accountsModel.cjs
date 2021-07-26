const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const accountsSchema = new Schema(
  {
    email: String,
    password: String,
    role: Number,
    isBlocked: Boolean,
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true },
);

accountsSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const tenMinute = 10 * 60 * 1000;
  this.passwordResetExpires = Date.now() + tenMinute;

  return resetToken;
};

accountsSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

accountsSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;

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
