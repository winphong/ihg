const express = require("express");
const router = express.Router();
const { Traffic } = require("../model/traffic");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const traffic = await Traffic.findOne({ type: "Access" });
  res.send(traffic);
});

// router.post("/", [admin], async (req, res) => {
//   const traffic = new Traffic(req.body);
//   await traffic.save();
//   res.send(traffic);
// });

router.put("/", async (req, res) => {
  const traffic = await Traffic.findOne({ type: "Access" });
  traffic.count += 1;
  traffic.accessDate = new Date();
  await traffic.save();
  res.send(traffic);
});

module.exports = router;
