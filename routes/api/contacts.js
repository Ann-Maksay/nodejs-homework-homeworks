const express = require("express");
const router = express.Router();

const { contacts: cntrl } = require("../../controllers");
const { validateMiddleware, validateAuth } = require("../../middlewares");
const {
  validateNewContact,
  validateUpdatedContact,
} = require("../../validateShemas");

router.get("/", validateAuth, cntrl.getListContacts);

router.get("/:contactId", validateAuth, cntrl.getContactById);

router.post(
  "/",
  validateAuth,
  express.json(),
  validateMiddleware(validateNewContact),
  cntrl.addContact
);

router.delete("/:contactId", validateAuth, cntrl.removeContact);

router.patch(
  "/:contactId/favorite",
  validateAuth,
  express.json(),
  cntrl.updateStatus
);

router.patch(
  "/:contactId",
  validateAuth,
  express.json(),
  validateMiddleware(validateUpdatedContact),
  cntrl.updateContact
);

module.exports = router;
