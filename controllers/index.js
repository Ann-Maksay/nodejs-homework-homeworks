const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contacts = require("./contacts.json");

const contactsPath = path.join(__dirname, "contacts.json");

const getListContacts = () => {
  const result = contacts;
  return result;
};

const getContactById = (contactId) => {
  const allContacts = getListContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  try {
    const result = getListContacts();
    const contactForDel = result.find((item) => item.id === contactId);
    if (!contactForDel) {
      return false;
    }
    const newContactList = result.filter((item) => item.id !== contactId);

    const newData = JSON.stringify(newContactList);
    await fs.writeFile(contactsPath, newData);

    return contactForDel;
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const newContact = { id: uuidv4(), ...body };
    const result = getListContacts();
    result.push(newContact);

    const newData = JSON.stringify(result);
    await fs.writeFile(contactsPath, newData);

    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const result = getListContacts();

    const index = result.findIndex((item) => item.id === contactId);

    if (index === -1) {
      return false;
    }

    result[index] = { ...result[index], ...body };

    const data = JSON.stringify(result);
    await fs.writeFile(contactsPath, data);

    return result[index];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
