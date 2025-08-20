import express  from 'express'

import * as userCntrl  from "./user.controller.js"
import isLoggedIn  from '../../middleware/auth.js'

const router = express.Router()

router.post("/signup", userCntrl.signupUser)
router.post("/signin", userCntrl.loginUser)
router.get("/logout", isLoggedIn, userCntrl.logoutUser)

router.get("/get-all-details", isLoggedIn, userCntrl.allUsers)
// router.get("/get-all-details/:userId",  userCntrl.getUserDetails)

export default router;
