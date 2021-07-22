const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const usersSchema = new Schema(
  {
    _userId: uuid,
    _accountId: uuid,
    username: String,
    email: String,
    avatar: String,
    password: String,
    repassword: String,
    createdAt: Date,
    isDeleted: Boolean,
    deletedAt: Date,
  },
  { timestamps: true },
);

usersSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
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

const user = mongoose.model('user', usersSchema);

module.exports = user;
