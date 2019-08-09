const express = require("express");
const router = express.Router();
const { Sport, validate } = require("../model/sport");

router.get("/", async (req, res) => {
  const sport = await Sport.find();
  res.send(sport);
});

router.get("/:sport", async (req, res) => {
  const sport = await Sport.find({ name: req.params.sport });
  if (!sport) return res.status(400).send("Sport not found!");
  res.send(sport);
});

router.post("/", async (req, res) => {
  const sport = new Sport(req.body);
  await sport.save();
  res.send(sport);
});

router.put("/:sport", async (req, res) => {
  const sport = await Sport.find({ name: req.params.sport });
});

module.exports = router;
