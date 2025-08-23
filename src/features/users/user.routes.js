import express  from 'express'

//imports method & auth 
import * as userCntrl  from "./user.controller.js"
import isLoggedIn  from '../../middleware/auth.js'

const router = express.Router()

//user route 
router.post("/signup", userCntrl.signupUser)
router.post("/signin", userCntrl.loginUser)
router.get("/logout", isLoggedIn, userCntrl.logoutUser)
router.get("/get-all-details", isLoggedIn, userCntrl.allUsers)

export default router;
