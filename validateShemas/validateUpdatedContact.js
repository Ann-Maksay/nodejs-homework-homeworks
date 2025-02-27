const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

const validateNewContact = (obj) => {
  const { error } = schema.validate(obj);
  return error;
};

module.exports = validateNewContact;
