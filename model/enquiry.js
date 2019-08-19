// const Joi = require("joi");
const mongoose = require("mongoose");

const Enquiry = mongoose.model(
  "Enquiry",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  })
);

function validateEnquiry(enquiry) {
  const schema = {};

  return Joi.validate(enquiry, schema);
}

exports.Enquiry = Enquiry;
exports.validate = validateEnquiry;
