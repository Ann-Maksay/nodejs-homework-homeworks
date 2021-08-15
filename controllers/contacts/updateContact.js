const { contacts: services } = require("../../services");

const updateContact = async (req, res, next) => {
  try {
    const {
      user: { _id },
      body,
      params: { contactId },
    } = req;

    const updatedContact = await services.update(contactId, _id, body);

    res.json({
      status: "success",
      code: 200,
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    if (eror.message.includes("validation failed")) {
      error.code = 400;
    }
    next(error);
  }
};

module.exports = updateContact;
