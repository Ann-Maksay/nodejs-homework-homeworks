const { contacts: services } = require("../services");

const updateContact = async (req, res, next) => {
  try {
    const {
      body,
      params: { contactId },
    } = req;

    const result = await services.update(contactId, body);

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
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
