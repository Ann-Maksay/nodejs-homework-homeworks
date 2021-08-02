const { contacts: services } = require("../services");

const updateContact = async (req, res, next) => {
  try {
    const {
      body,
      params: { contactId },
    } = req;

    if (!body) {
      res.status(400).json({
        status: "error",
        code: 404,
        message: "missing fields",
      });
      return;
    }

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

module.export = updateContact;
