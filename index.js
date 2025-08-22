import express  from 'express'
import bodyParser  from 'body-parser'
import cookieParser  from 'cookie-parser'
import cors from "cors";
import dotenv  from 'dotenv'
dotenv.config()

const app = express();

//import Routes 
import usersRoutes  from './src/features/users/user.routes.js'
import eduRoutes  from "./src/features/educators/educaters.routes.js"
import testRoutes  from "./src/features/testmonials/testmonials.routes.js"

//functions
import {connectDatabase}  from './src/database/mongoDb.js'

//middleware
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes 
app.use("/api/users", usersRoutes)
app.use("/api/educators", eduRoutes)
app.use("/api/testmonials", testRoutes)

app.get("/",(req, res)=>{
    res.send("Hello world! who hi")
})

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on 4000")
    connectDatabase()
})