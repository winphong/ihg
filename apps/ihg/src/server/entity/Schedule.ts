import { InferSchemaType, model, models, Schema } from "mongoose";

const ScheduleSchema = new Schema({
  sport: {
    type: String,
    required: true,
  },
  halls: [
    {
      name: {
        type: String,
        required: true,
      },
      imgUrl: {
        type: String,
        required: true,
      },
      colourCode: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
      },
      abbreviation: {
        type: String,
        required: true,
      },
    },
  ],
  // get date from here
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Mixed"],
    required: true,
  },
  stage: {
    type: String,
    enum: [
      "Group A",
      "Group B",
      "Prelims",
      "Semi 1",
      "Semi 2",
      "Finals",
      "Carnival",
      "Playoffs",
    ],
    required: true,
  },
});

export type ScheduleDocument = InferSchemaType<typeof ScheduleSchema> & {
  _id: string;
};

const Schedule = models.Schedule || model("Schedule", ScheduleSchema);

export default Schedule;
