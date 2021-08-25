const jwt = require("jsonwebtoken");
require("dotenv").config();

const { users: services } = require("../../services");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await services.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Email or password is wrong",
      });
    }
    if (!user.verify) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Email not verified",
      });
    }
    const { SECRET_KEY } = process.env;
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await services.updateById(user._id, { token });
    const userInfo = { email: user.email, subscription: user.subscription };
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        userInfo,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
