import mongoose from "mongoose";

// Testmonials Schema
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
