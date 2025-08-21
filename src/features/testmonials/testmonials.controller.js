import * as testRepo from "./testmonials.repository.js";

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

const datafeeding = async (req, res) => {
  try {
    const data = [
      {
        name:"Amora Lindsey",
        comment:"As an IB student, I've experienced the intense pressure and stress that comes with the program.",
        imageURL:"https://spaces-cdn.nailib.com/testimonials/Amora%20Lindsey/ib-student-studying.jpg?w=1920&q=75"
      },
      {
        name:"Ainsley Cook",
        comment:"Nail IB, the indispensable study partner every student needs! Speaking from experience, I can confide...",
        imageURL:"https://spaces-cdn.nailib.com/testimonials/Ainsley%20Cook/ib-student-notes.jpeg?w=1920&q=75"
      },
      {
        name:"Katie Mills",
        comment:"Feeling overwhelmed in the IB program is normal, but Nail IB was my guiding light that transformed my...",
        imageURL:"https://spaces-cdn.nailib.com/testimonials/Katie%20Mills/ib-student-reading-ib-notes.jpeg?w=1920&q=75"
      },
      {
        name:"Hazel Barnes",
        comment:"I'm here to share my secret ally during this challenging IB journey: Nail IB has been my lifeline...",
        imageURL:"https://spaces-cdn.nailib.com/testimonials/Hazel%20Barnes/ib-student-studying.jpg?w=1920&q=75"
      },
      {
        name:"Erik Briggs",
        comment:"As a fellow IB student, I wholeheartedly recommend Nail IB! This platform's video tutorials and s...",
        imageURL:"https://spaces-cdn.nailib.com/testimonials/Erik%20Briggs/ib-student-watching-nail-ib-videos.jpg?w=1920&q=75"
      },
      {
        name:"Lyla Rogers",
        comment:"Discovering Nail IB has been a game-changer during my International Baccalaureate (IB) Diploma adventure! T...",
        imageURL:"https://spaces-cdn.nailib.com/testimonials/Lyla%20Rogers/ib-student-in-library.jpeg?w=1920&q=75"
      },
    ];
    for (const item of data) {
      // Assuming "data" is defined somewhere
      const { name, comment, imageURL } = item;
      await testRepo.addTestmonials({ name, comment, imageURL });
    }

    res.status(201).json({
      status: "Success",
      msg: "Data fed successfully!",
    });
  } catch (err) {
    console.error("Error in datafeeding:", err);
    res.status(500).json({ error: "Failed to feed data!" });
  }
};

export { postTest, getTest, datafeeding };
