import * as testRepo from "./testmonials.repository.js";

//post testmonials method
const postTest = async (req, res) => {
  try {
    const { name, comment, imageURL } = req.body;

    if (!name || !comment || !imageURL ) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    
    const result = await testRepo.addTestmonials({ name, comment, imageURL });

    if (!result) {
      return res.status(400).json({ error: "Testmonials could not be added!" });
    }

    res.status(201).json({
      status: "Success",
      msg: "Testmonials added successfully!",
      data: result,
    });
  } catch (err) {
    console.error("Error in postTest:", err);
    res.status(500).json({ error: "Internal server error!" });
  }
};

//get all testmonials from mongodb
const getTest = async (req, res) => {
  try {
    const result = await testRepo.getTestmonials();

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "No Testmonials found!" });
    }

    res.status(200).json({
      status: "Success",
      msg: "Data fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.error("Error in getTest:", err);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export { postTest, getTest };
