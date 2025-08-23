import express  from 'express'

//method import
import {postTest, getTest} from "./testmonials.controller.js"

const router = express.Router()

//route for tesmonials
router.post("/post", postTest)
router.get("/fetch",  getTest)

export default router;
