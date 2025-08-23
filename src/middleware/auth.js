//Import package
import jwt from 'jsonwebtoken'

import {UserModel} from "../features/users/user.repositoy.js"

//auth middleware method 
const isLoggedIn = async (req, res, next) =>{
    try{
        const token = req.cookies?.jwtToken;

        if(!token){
            return res.status(400).json({
                status: "FAILED",
                message: "You are not logged in. Please log in!"
            })
        }
        
        const user = jwt.verify(token, process.env.PRIVATE_KEY)
        const checkUser = await UserModel.findOne({_id:user._id})
        
        if(!checkUser){
            return res.status(400).json({
                status: "FAILED",
                message: "You are not logged in. Please log in!"
            })
        }
        
        
        req.user = user;
        next() 

    }catch(err){
        res.status(500).json({
            status:"FAILED",
            msg:"You are not logged in. Please log in!"
        })
    }
}

export default isLoggedIn;