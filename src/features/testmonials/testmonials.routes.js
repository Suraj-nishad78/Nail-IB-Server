import express  from 'express'

import {postTest, getTest, datafeeding} from "./testmonials.controller.js"


const router = express.Router()

router.post("/post", postTest)
router.post("/allpostdata", datafeeding)
router.get("/fetch",  getTest)

export default router;
