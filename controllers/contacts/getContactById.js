const { contacts: services } = require("../../services");

const getContactById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params;
    const result = await services.getById(contactId, _id);

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
