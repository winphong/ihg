const express = require("express");
const router = express.Router();
const { Hall, validate } = require("../model/hall");
const _ = require("lodash");

router.get("/", async (req, res) => {
  const hall = await Hall.find().sort({ name: 1 });
  res.send(hall);
});

router.post("/", async (req, res) => {
  const hall = new Hall(req.body);

  await hall.save();
  res.send(hall);
});

router.put("/", async (req, res) => {
  const halls = [];
  await Promise.all(
    req.body.map(async hall => {
      const updateDetails = _.pick(hall, [
        "malePoint",
        "femalePoint",
        "totalPoint"
      ]);
      await Hall.findByIdAndUpdate(
        hall._id,
        // All top level update keys which are not atomic operation names are treated as set operations:
        { $set: updateDetails },
        { new: true }
      )
        .then(async response => {
          halls.push(response);
        })
        .catch(error => {
          console.log(error);
        });
    })
  )
    .then(() => {
      res.send(halls);
    })
    .catch(error => {
      res.status(404).send(error);
    });
});

module.exports = router;
