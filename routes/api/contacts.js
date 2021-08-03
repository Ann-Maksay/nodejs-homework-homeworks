const express = require("express");
const router = express.Router();

const contactsAction = require("../../model");
const { validateMiddleware } = require("../../middlewares");
const {
  validateNewContact,
  validateUpdatedContact,
} = require("../../validateShemas");

router.get("/", async (req, res, next) => {
  try {
    const data = contactsAction.getListContacts();

    console.log(data);

    res.json({
      status: "success",
      code: 200,
      data: {
        result: data,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = contactsAction.getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validateMiddleware(validateNewContact),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newContact = await contactsAction.addContact(body);

      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          result: newContact,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedProduct = await contactsAction.removeContact(contactId);

    if (!deletedProduct) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        message: "contact deleted",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId",
  validateMiddleware(validateUpdatedContact),
  async (req, res, next) => {
    try {
      const {
        body,
        params: { contactId },
      } = req;

      if (!body) {
        res.status(400).json({
          status: "error",
          code: 404,
          message: "missing fields",
        });
        return;
      }

      const updatedContact = await contactsAction.updateContact(
        contactId,
        body
      );

      if (!updatedContact) {
        res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
        return;
      }

      res.json({
        status: "success",
        code: 200,
        data: {
          result: updatedContact,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
