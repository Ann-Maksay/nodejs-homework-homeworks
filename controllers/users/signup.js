const { users: services } = require("../../services");
const gravatar = require("gravatar");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await services.getOne({ email });
    if (result) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
    }

    const avatarURL = gravatar.url(email, { s: 250 });
    console.log(avatarURL);

    await services.add({
      email,
      password,
      avatarURL,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Success register",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
