const { contacts: services } = require("../services");

const addContact = async (req, res, next) => {
  try {
    const newContact = req.body;
    const result = await services.add(newContact);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.code = 400;
    }
    next(error);
  }
};

module.exports = addContact;
