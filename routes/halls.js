const express = require("express");
const router = express.Router();
const { Hall, validate } = require("../model/hall");

router.get("/", async (req, res) => {
  const hall = await Hall.find();
  res.send(hall);
});

router.post("/", async (req, res) => {
  const hall = new Hall(req.body);

  await hall.save();
  res.send(hall);
});

module.exports = router;
