const { contacts: services } = require("../../services");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await services.getById(contactId);
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.code = 404;
    }
    next(error);
  }
};
module.exports = getContactById;
