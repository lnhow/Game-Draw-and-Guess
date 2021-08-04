//Validation
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(20),
    passwordConfirm: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(20),
  });
  return schema.validate(data);
};

const repasswordValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().required().min(6).max(20),
    passwordConfirm: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
  });
  return schema.validate(data);
};

const createRoomValidation = (data) => {
  const schema = Joi.object({
    roomName: Joi.string().required().min(6),
    roomCategory: Joi.string().required(),
    maxPlayer: Joi.number().required(),
    timePerRound: Joi.number().required(),
  });
  return schema.validate(data);
};

const usernameValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.repasswordValidation = repasswordValidation;
module.exports.createRoomValidation = createRoomValidation;
module.exports.usernameValidation = usernameValidation;
