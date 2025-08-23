import express  from 'express'

//Method imports
import {postEdu, getEdu} from "./educaters.controller.js"


const router = express.Router()

//routes for educators
router.post("/post", postEdu)
router.get("/fetch",  getEdu)

export default router;
