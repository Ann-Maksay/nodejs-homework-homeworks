const { Contact } = require("../models");

const getAll = (usersId) => Contact.find({ owner: usersId });

const getById = (contactId, userId) =>
  Contact.findById({ _id: contactId, owner: userId });

const getOne = (query) => Contact.findOne(query);

const add = (newContact) => Contact.create(newContact);

const update = (contactId, userId, updateContact) =>
  Contact.findByIdAndUpdate({ _id: contactId, owner: userId }, updateContact);

const del = (contactId, userId) =>
  Contact.findByIdAndDelete({ _id: contactId, owner: userId });

module.exports = {
  getAll,
  getById,
  getOne,
  add,
  update,
  del,
};
