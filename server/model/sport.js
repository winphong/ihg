// const Joi = require("joi");
const mongoose = require("mongoose");

const Sport = mongoose.model(
  "Sport",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    standings: [
      {
        hall: {
          type: String,
          required: true
        },
        point: {
          type: Number,
          required: true,
          min: 1
        },
        position: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ]
  })
);

function validateSport(sport) {
  const schema = {};

  return Joi.validate(sport, schema);
}

exports.Sport = Sport;
exports.validate = validateSport;
