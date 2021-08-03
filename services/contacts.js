const { Contact } = require("../models");

const getAll = () => Contact.find({});

const getById = (id) => Contact.findById(id);

const getOne = (query) => Contact.findOne(query);

const add = (newContact) => Contact.create(newContact);

const update = (id, updateContact) =>
  Contact.findByIdAndUpdate(id, updateContact);

const del = (id) => Contact.findByIdAndDelete(id);

module.exports = {
  getAll,
  getById,
  getOne,
  add,
  update,
  del,
};
