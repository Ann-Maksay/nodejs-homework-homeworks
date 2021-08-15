const { contacts: services } = require("../../services");

const removeContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params;

    await services.del(contactId, _id);

    res.json({
      status: "success",
      code: 200,
      data: {
        message: "contact deleted",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
