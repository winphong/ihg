const express = require("express");
const error = require("../middleware/error");
const schedule = require("../routes/schedules");
const hall = require("../routes/halls");
const sport = require("../routes/sports");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/schedule", schedule);
  app.use("/api/hall", hall);
  app.use("/api/sport", sport);
  app.use(error);
};
