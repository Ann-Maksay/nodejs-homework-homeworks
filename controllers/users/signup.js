const { users: services } = require("../../services");
const { sendMail } = require("../../utils");

const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

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

    const verifyToken = uuidv4();

    await services.add({
      email,
      password,
      avatarURL,
      verifyToken,
    });

    const mailData = {
      to: email,
      subject: "Verify email",
      text: "Confim your email, please",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verifyToken}">Confirm signup</a>`,
    };

    await sendMail(mailData);

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
