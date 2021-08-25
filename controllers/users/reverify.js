const { users: services } = require("../../services");
const { sendMail } = require("../../utils");

const reverify = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await services.getOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }

    if (user.verify) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Verification has already been passed",
      });
    }

    const mailData = {
      to: email,
      subject: "Verify email",
      text: "Confim your email, please",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verifyToken}">Confirm signup</a>`,
    };

    await sendMail(mailData);

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = reverify;
