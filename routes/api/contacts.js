const express = require("express");
const router = express.Router();

const { contacts: cntrl } = require("../../controllers");
const { validateMiddleware } = require("../../middlewares");
const {
  validateNewContact,
  validateUpdatedContact,
} = require("../../validateShemas");

router.get("/", cntrl.getListContacts);

router.get("/:contactId", cntrl.getContactById);

router.post(
  "/",
  express.json(),
  validateMiddleware(validateNewContact),
  cntrl.addContact
);

router.delete("/:contactId", cntrl.removeContact);

router.patch("/:contactId/favorite", express.json(), cntrl.updateStatus);

router.patch(
  "/:contactId",
  express.json(),
  validateMiddleware(validateUpdatedContact),
  cntrl.updateContact
);

module.exports = router;
