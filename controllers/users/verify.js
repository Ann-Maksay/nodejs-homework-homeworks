const { users: services } = require("../../services");

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await services.getOne({ verifyToken: verificationToken });

    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }

    await services.updateById(user._id, { verifyToken: null, verify: true });

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
