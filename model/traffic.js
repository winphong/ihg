const Joi = require("joi");
const mongoose = require("mongoose");

const Traffic = mongoose.model(
  "Traffic",
  new mongoose.Schema({
    type: {
      type: String,
      required: true,
      unique: true
    },
    count: {
      type: Number,
      required: true
    },
    accessDate: {
      type: Date,
      required: true
    }
  })
);

exports.Traffic = Traffic;
