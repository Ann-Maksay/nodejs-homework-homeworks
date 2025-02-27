const { User } = require("../models");

const getOne = (filter) => {
  return User.findOne(filter);
};

const getById = (id) => {
  return User.findById(id);
};

const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo, { new: true });
};

const add = ({ email, password, avatarURL, verifyToken }) => {
  const newUser = new User({ email, avatarURL, verifyToken });
  newUser.setPassword(password);
  return newUser.save();
};

module.exports = {
  getOne,
  getById,
  updateById,
  add,
};
