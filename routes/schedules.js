const express = require("express");
const router = express.Router();
const { Schedule, validate } = require("../model/schedule");
const { Hall } = require("../model/hall");
const _ = require("lodash");

// get all schedules
router.get("/", async (req, res) => {
  const schedule = await Schedule.find().sort({ startTime: 1 });
  res.send(schedule);
});

router.get("/:id", async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);
  if (!schedule) return res.status(400).send("Schedule not found!");
  res.send(schedule);
});

// create new schedules
router.post("/", async (req, res) => {
  let hall = [];
  Promise.all(
    req.body.halls.map(async e => {
      await Hall.findOne({ abbreviation: e }).then(resp => {
        hall.push(resp);
      });
    })
  )
    .then(async () => {
      console.log(hall);
      hall = hall.map(e => {
        return _.pick(e, ["name", "imgUrl", "colourCode", "abbreviation"]);
      });
      req.body.halls = hall;
      console.log(req.body);
      const schedule = new Schedule(req.body);
      await schedule.save();
      res.send(schedule);
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
});

// update score
router.put("/updateScore/:id", async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);
  if (!schedule) return res.status(400).send("Schedule not found!");

  schedule.halls = req.body.halls;
  await schedule.save();
  res.send(schedule);
});

// update schedule
router.put("/:id", async (req, res) => {
  let schedule = await Schedule.findById(req.params.id);
  if (!schedule) return res.status(400).send("Schedule not found!");

  let hall = [];
  Promise.all(
    req.body.hall.map(async e => {
      await Hall.findOne({ name: e }).then(resp => {
        hall.push(resp);
      });
    })
  )
    .then(async () => {
      hall = hall.map(e => {
        return _.pick(e, [
          "name",
          "imgUrl",
          "colourCode",
          "abbreviation",
          "score"
        ]);
      });
      req.body.hall = hall;
      schedule = await Schedule.findByIdAndUpdate(
        { _id: req.params.id },
        _.pick(req.body, [
          "sport",
          "hall",
          "startTime",
          "endTime",
          "venue",
          "gender",
          "stage"
        ]),
        { new: true }
      );

      res.send(schedule);
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

module.exports = router;
