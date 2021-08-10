const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateNewUser = (obj) => {
  const { error } = schema.validate(obj);
  return error;
};

module.exports = validateNewUser;
