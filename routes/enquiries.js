const express = require("express");
const router = express.Router();
const { Enquiry, validate } = require("../model/enquiry");

router.get("/", async (req, res) => {
  const enquiry = await Enquiry.find();
  res.send(enquiry);
});

router.post("/", async (req, res) => {
  const enquiry = new Enquiry(req.body);

  await enquiry.save();
  res.send(enquiry);
});

module.exports = router;
