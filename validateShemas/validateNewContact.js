const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateNewContact = (obj) => {
  const { error } = schema.validate(obj);
  return error;
};

module.exports = validateNewContact;
