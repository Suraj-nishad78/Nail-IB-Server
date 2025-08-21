import mongoose from "mongoose";

export const testmonialsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  }
});
