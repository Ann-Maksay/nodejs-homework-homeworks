const path = require("path");
const fs = require("fs").promises;
var Jimp = require("jimp");
const { users: services } = require("../../services");

const avatarDir = path.join(__dirname, "../../public/avatar");

const avatar = async (req, res, next) => {
  try {
    const { path: tempPath } = req.file;
    const { _id } = req.user;

    const resultPath = path.join(avatarDir, `${_id.toString()}.jpeg`);

    const newAvatar = await Jimp.read(tempPath);
    await newAvatar.resize(250, 250).write(tempPath);

    await fs.rename(tempPath, resultPath);

    await services.updateById(_id, { avatarURL: resultPath });

    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL: resultPath,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = avatar;
