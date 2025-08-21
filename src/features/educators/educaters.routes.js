import express  from 'express'

import {postEdu, getEdu, datafeeding} from "./educaters.controller.js"


const router = express.Router()

router.post("/post", postEdu)
router.post("/allpostdata", datafeeding)
router.get("/fetch",  getEdu)

export default router;
