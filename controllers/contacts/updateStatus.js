const { contacts: services } = require("../../services");

const updateStatus = async (req, res, next) => {
  try {
    const {
      body,
      params: { contactId },
    } = req;

    const { favorite } = body;

    if (!body || typeof favorite !== "boolean") {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Status must be true or false",
      });
    }

    const updatedData = {
      favorite,
    };

    const result = await services.update(contactId, updatedData);

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

module.exports = updateStatus;
