const current = async (req, res, next) => {
  const { email, subscription } = req.user;
  const result = {
    email,
    subscription,
  };

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = current;
