const express = require("express");

const { validateAuth, validateMiddleware } = require("../../middlewares");
const { users: cntrl } = require("../../controllers");
const { validateNewUser } = require("../../validateShemas");

const router = express.Router();

router.post(
  "/signup",
  express.json(),
  validateMiddleware(validateNewUser),
  cntrl.signup
);

router.post("/login", express.json(), cntrl.login);

router.get("/logout", validateAuth, cntrl.logout);

router.get("/current", validateAuth, cntrl.current);

module.exports = router;
