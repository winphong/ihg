const express = require("express");
const router = express.Router();
const { Admin, validate } = require("../model/admin");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.status(400).send("Invalid username or password");

  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const jwt = admin.generateAuthToken();
  res.send(jwt);
});

router.post("/register", async (req, res) => {
  const admin = new Admin(req.body);
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);

  await admin.save();
  res.send(admin);
});

module.exports = router;
