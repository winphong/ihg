const express = require("express");
const error = require("../middleware/error");
const schedule = require("../routes/schedules");
const hall = require("../routes/halls");
const sport = require("../routes/sports");
const enquiry = require("../routes/enquiries");
const traffic = require("../routes/traffic");
const admin = require("../routes/admins");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/traffic", traffic);
  app.use("/api/schedule", schedule);
  app.use("/api/hall", hall);
  app.use("/api/sport", sport);
  app.use("/api/enquiry", enquiry);
  app.use("/api/images", express.static("images"));
  app.use("/api/admin", admin);

  app.use(error);
};
