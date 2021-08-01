const validateMiddleware = (validateShema) => {
  return (req, res, next) => {
    const error = validateShema(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        messsage: error.message,
      });
      return;
    }
    next();
  };
};

module.exports = validateMiddleware;
