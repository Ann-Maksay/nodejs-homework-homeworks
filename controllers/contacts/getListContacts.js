const { contacts: services } = require("../../services");

const getListContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await services.getAll(_id);
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getListContacts;
