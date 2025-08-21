import mongoose from "mongoose";

export const educatorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  course: {
    type: [String],
    required: true,
  },
  link: {
    type: String,
    required: true,
  }
});
