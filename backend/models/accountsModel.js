const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const accountsSchema = new Schema(
  {
    _accountId: uuid,
    email: String,
    password: String,
    role: Number,
    isBlocked: Boolean,
  },
  { timestamps: true },
);

accountsSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
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

const account = mongoose.model('account', accountsSchema);

module.exports = account;
