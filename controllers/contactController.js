const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");

/*
@desc get all contacts
@route GET /api/contact
@access private
*/
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.userId });
  res.status(200).json(contacts);
});

/*
@desc create a contact
@route POST /api/contact
@access private
*/
const createContact = asyncHandler(async (req, res) => {
  if (!req?.body?.name || !req?.body?.email || !req?.body?.phone) {
    res.status(400);
    throw new Error("All fields are required to create a contact.");
  }
  const newContact = await Contact.create({
    user_id: req.userId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  res.status(201).json(newContact);
});

/*
@desc update a contact
@route PUT /api/contact/:id
@access private
*/
const updateContact = asyncHandler(async (req, res) => {
  if (!req?.params?.id) {
    res.status(400);
    throw new Error("Id is required to update a contact.");
  }
  const contact = await Contact.find({
    _id: req.params.id,
    user_id: req.userId,
  });
  if (!contact[0]) {
    res.status(404);
    throw new Error("Contact not found.");
  }
  if (req.body.name) contact[0].name = req.body.name;
  if (req.body.email) contact[0].email = req.body.email;
  if (req.body.phone) contact[0].phone = req.body.phone;
  await contact[0].save();
  res.status(200).json(contact);
});

/*
@desc delete a contact
@route DELETE /api/contact/:id
@access private
*/
const deleteContact = asyncHandler(async (req, res) => {
  if (!req?.params?.id) {
    res.status(400);
    throw new Error("Id required to delete a contact.");
  }
  const contact = await Contact.find({
    _id: req.params.id,
    user_id: req.userId,
  });
  if (!contact[0]) {
    res.status(404);
    throw new Error("Contact not found.");
  }
  const result = await Contact.deleteOne(contact[0]);
  res.status(200).json(result);
});

/*
@desc get a specific contact
@route GET /api/contact/:id
@access private
*/
const getSingleContact = asyncHandler(async (req, res) => {
  if (!req?.params?.id) {
    res.status(400);
    throw new Error("Id is required to get a contact.");
  }
  const contact = await Contact.find({
    _id: req.params.id,
    user_id: req.userId,
  });
  if (!contact[0]) {
    res.status(404);
    throw new Error("Contact not found.");
  }
  res.status(200).json(contact[0]);
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getSingleContact,
};
