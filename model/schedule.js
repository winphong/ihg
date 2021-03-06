// const Joi = require("joi");
const mongoose = require("mongoose");

const Schedule = mongoose.model(
  "Schedule",
  new mongoose.Schema({
    sport: {
      type: String,
      required: true
    },
    halls: [
      {
        name: {
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
        score: {
          type: Number
        },
        abbreviation: {
          type: String,
          required: true
        }
      }
    ],
    // get date from here
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    venue: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Mixed"],
      required: true
    },
    stage: {
      type: String,
      enum: [
        "Group A",
        "Group B",
        "Prelims",
        "Semi 1",
        "Semi 2",
        "Finals",
        "Carnival",
        "Playoffs"
      ],
      required: true
    }
  })
);

function validateSchedule(schedule) {
  const schema = {};

  return Joi.validate(schedule, schema);
}

exports.Schedule = Schedule;
exports.validate = validateSchedule;
