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

router.put("/", async (req, res) => {
  const { name, malePoint, femalePoint } = req.body;
  const hall = await Hall.findOne({ name });
  if (!hall) res.status(404).send("Hall doesn't exist!");

  hall.malePoint = malePoint;
  hall.femalePoint = femalePoint;
  hall.totalPoint = malePoint + femalePoint;

  await hall.save();
  res.send(hall);
});

module.exports = router;
