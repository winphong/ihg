// const Joi = require("joi");
const mongoose = require("mongoose");

const Hall = mongoose.model(
  "Hall",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    abbreviation: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    colourCode: {
      type: String,
      required: true
    },
    malePoint: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    femalePoint: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    totalPoint: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    }
  })
);

function validateHall(hall) {
  const schema = {};

  return Joi.validate(hall, schema);
}

exports.Hall = Hall;
exports.validate = validateHall;
