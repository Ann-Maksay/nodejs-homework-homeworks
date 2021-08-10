const { users: services } = require("../../services");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await services.updateById(_id, { token: null });
    res.json({
      status: "success",
      code: 200,
      message: "success logout",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
