const express = require("express");

const {
  validateAuth,
  validateMiddleware,
  filesMiddleware,
} = require("../../middlewares");
const { users: cntrl } = require("../../controllers");
const { validateNewUser } = require("../../validateShemas");

const router = express.Router();

router.post("/signup", validateMiddleware(validateNewUser), cntrl.signup);

router.post("/login", cntrl.login);

router.get("/logout", validateAuth, cntrl.logout);

router.get("/current", validateAuth, cntrl.current);

router.patch(
  "/avatar",
  validateAuth,
  filesMiddleware.single("avatar"),
  cntrl.avatar
);

module.exports = router;
