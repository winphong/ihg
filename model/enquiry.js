const Joi = require("joi");
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
  const schema = {
    name: Joi.string()
      .required()
      .error(errors => {
        return {
          message: "Name is required!"
        };
      }),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .error(errors => {
        return {
          message: "Email is required!"
        };
      }),
    subject: Joi.string()
      .required()
      .error(errors => {
        return {
          message: "Subject is required!"
        };
      }),
    message: Joi.string()
      .required()
      .error(errors => {
        return {
          message: "Message is required!"
        };
      })
  };

  return Joi.validate(enquiry, schema);
}

exports.Enquiry = Enquiry;
exports.validate = validateEnquiry;
