const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
});

const validateEmail = (obj) => {
  const { error } = schema.validate(obj);
  return error;
};

module.exports = validateEmail;
