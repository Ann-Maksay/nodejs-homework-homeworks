const express = require("express");
const router = express.Router();

const cntrl = require("../../controllers");
const { validateMiddleware } = require("../../middlewares");
const {
  validateNewContact,
  validateUpdatedContact,
} = require("../../validateShemas");

router.get("/", cntrl.getListContacts);

router.get("/:contactId", cntrl.getContactById);

router.post("/", validateMiddleware(validateNewContact), cntrl.addContact);

router.delete("/:contactId", cntrl.removeContact);

router.patch(
  "/:contactId",
  validateMiddleware(validateUpdatedContact),
  cntrl.updateContact
);

router.patch("/:contactId/favorite", cntrl.updateStatus);

module.exports = router;
