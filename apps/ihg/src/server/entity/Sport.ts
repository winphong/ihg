import { Schema, model, models } from "mongoose";

const SportSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  standings: [
    {
      hall: {
        type: String,
        required: true,
      },
      point: {
        type: Number,
        required: true,
        min: 1,
      },
      position: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

const Sport = models.Sport || model("Sport", SportSchema);
export default Sport;
