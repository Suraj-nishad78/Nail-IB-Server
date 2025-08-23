import mongoose from "mongoose";
import { educatorsSchema } from "./educaters.schema.js";

//Educators model 
export const EduModel = mongoose.model("Educators", educatorsSchema);

//Add educators detail in mongodb method
const addEducators = async (educatorData) => {
  try {
    const result = await EduModel.create(educatorData);
    return result;
  } catch (err) {
    console.error("Error while creating educator:", err);
    return null;
  }
};

//get educators detail in mongodb method
const getEducators = async () => {
  try {
    return await EduModel.find({}).lean();
  } catch (err) {
    console.error("Error while fetching educators:", err);
    return [];
  }
};

export { addEducators, getEducators };
