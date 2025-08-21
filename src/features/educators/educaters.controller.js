import * as eduRepo from "./educaters.repository.js";

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

const datafeeding = async (req, res) => {
  try {
    const data = [
      {
        name: "Patrick Jones",
        info: "1.2M+ YouTube subscribers, 30+ years' experience, Ivy League visiting faculty!",
        course: ["Mathematics AA SL"],
        link: "https://player.vimeo.com/video/544865597?h=695a05baea&autoplay=1",
      },
      {
        name: "Dr Adam Nazha",
        info: "Top IB Math Tutor: 45/45 IBDP, 7/7 Further Math, 7 Yrs Exp, Medicine Student",
        course: ["Mathematics AA HL", "Mathematics AA SL", "Mathematics Ai HL"],
        link: "https://player.vimeo.com/video/544865597?h=695a05baea&autoplay=1",
      },
      {
        name: "Ilan Grapel",
        info: "Tech & Law Grad Educator: Boost IB Math/CS Skills with Real-World Projects & Expertise!",
        course: ["Mathematics AA HL"],
        link: "https://player.vimeo.com/video/544865597?h=695a05baea&autoplay=1",
      },
      {
        name: "Ruchi Singh",
        info: "14+ yrs in IB English A LAL, avg score 6, unique insights as IB Examiner. Thrive with her!",
        course: ["English A language & Litrature SL"],
        link: "https://player.vimeo.com/video/544865597?h=695a05baea&autoplay=1",
      },
      {
        name: "Bahador Shirazian",
        info: "15+ yrs IB experience, 99.99% A Grades, IB Examiner, Leading ToK Expert!",
        course: ["English B SL", "English B HL"],
        link: "https://player.vimeo.com/video/544865597?h=695a05baea&autoplay=1",
      },
      {
        name: "Melina Graves",
        info: "10+ yrs exp, Honors Diploma, IB Examiner, Bilingual+, Elite IB Spanish Guru",
        course: ["Spanish Ab Initia"],
        link: "https://player.vimeo.com/video/544865597?h=695a05baea&autoplay=1",
      },
      {
        name: "Dr Angela Jebailey",
        info: "Experienced IB Bio teacher with a 6.18 student avg, ready to help you nail that 7!",
        course: ["Biology SL", "Biology HL"],
        link: "https://player.vimeo.com/video/544865597?h=695a05baea&autoplay=1",
      },
      {
        name: "Dr Ben Liu",
        info: "44/45 IBDP grad; 7/7 IB Bus. Mgmt. HL; 3+ yrs IB tutor; Uni Sydney faculty & med student",
        course: ["Sports SL", "Sports HL"],
        link: "https://player.vimeo.com/video/544865597?h=695a05baea&autoplay=1",
      },
      {
        name: "David McKay",
        info: "Ivy league graduate, 4+ yrs of experience, vetted IB Examiner!",
        course: ["Physics SL", "Physics HL"],
        link: "https://player.vimeo.com/video/544865597?h=695a05baea&autoplay=1",
      },
      {
        name: "Mrs. Devlina Singh",
        info: "Discover Devlina Singh, a visionary IB ESS educator with 18+ years of transformative teaching expertise.",
        course: ["Chemistry SL", "Chemistry HL"],
        link: "https://player.vimeo.com/video/544865597?h=695a05baea&autoplay=1",
      },
    ];
    for (const item of data) {
      // Assuming "data" is defined somewhere
      const { name, info, course, link } = item;
      await eduRepo.addEducators({ name, info, course, link });
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

export { postEdu, getEdu, datafeeding };
