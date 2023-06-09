const express = require("express");
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getSingleContact,
} = require("../../controllers/contactController");
const verifyJWT = require("../../middleware/verifyJWT");
const router = express.Router();

router.use(verifyJWT);

router.route("/").get(getContacts).post(createContact);

router
  .route("/:id")
  .put(updateContact)
  .delete(deleteContact)
  .get(getSingleContact);

module.exports = router;
