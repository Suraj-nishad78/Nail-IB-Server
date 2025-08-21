import mongoose from "mongoose";
import { testmonialsSchema } from "./testmonials.schema.js";

export const TestmonialsModel = mongoose.model("Testmonials", testmonialsSchema);

const addTestmonials = async (testData) => {
  try {
    const result = await TestmonialsModel.create(testData);
    return result;
  } catch (err) {
    console.error("Error while creating educator:", err);
    return null;
  }
};

const getTestmonials = async () => {
  try {
    return await TestmonialsModel.find({}).lean();
  } catch (err) {
    console.error("Error while fetching educators:", err);
    return [];
  }
};

export { addTestmonials, getTestmonials };
