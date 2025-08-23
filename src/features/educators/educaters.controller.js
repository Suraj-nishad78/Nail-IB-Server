import * as eduRepo from "./educaters.repository.js";

//add educators in the mongodb method
const postEdu = async (req, res) => {
  try {
    const { name, info, course, link } = req.body;

    if (!name || !info || !course || !link) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    console.log(req.body);
    
    const result = await eduRepo.addEducators({ name, info, course, link });

    if (!result) {
      return res.status(400).json({ error: "Educator could not be added!" });
    }

    res.status(201).json({
      status: "Success",
      msg: "Educator added successfully!",
      data: result,
    });
  } catch (err) {
    console.error("Error in postEdu:", err);
    res.status(500).json({ error: "Internal server error!" });
  }
};

//get educators in the mongodb method
const getEdu = async (req, res) => {
  try {
    const result = await eduRepo.getEducators();

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "No educators found!" });
    }

    res.status(200).json({
      status: "Success",
      msg: "Data fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.error("Error in getEdu:", err);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export { postEdu, getEdu };
