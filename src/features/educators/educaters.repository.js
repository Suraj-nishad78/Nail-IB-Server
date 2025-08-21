import mongoose from "mongoose";
import { educatorsSchema } from "./educaters.schema.js";

export const EduModel = mongoose.model("Educators", educatorsSchema);

const addEducators = async (educatorData) => {
  try {
    const result = await EduModel.create(educatorData);
    return result;
  } catch (err) {
    console.error("Error while creating educator:", err);
    return null;
  }
};

const getEducators = async () => {
  try {
    return await EduModel.find({}).lean();
  } catch (err) {
    console.error("Error while fetching educators:", err);
    return [];
  }
};

export { addEducators, getEducators };
