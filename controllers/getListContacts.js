const { contacts: services } = require("../services");

const getListContacts = async (req, res, next) => {
  try {
    const result = await services.getAll;
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
