import  express from "express"
import cors  from  'cors'
// import dotenv from "dotenv";
import mongoose from "mongoose"
import foodRouter from "./routes/foodRoute.js";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'; // Load .env variables
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";

//app config
const app = express();
const PORT = process.env.PORT || 4000


//midlewares
app.use(express.json())
app.use(cors())

// Mongodb coonection 
connectDB();

// const  _dirname= path.resolve();

//API end point 
app.use('/api/user', userRouter)
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

// app.use(express.static(path.join(_dirname,"/frontend/dist")))
// app.get('*',(_,res)=>{
//     res.sendFile(path.resolve(_dirname,"frontend", "dist" , "index.html"));
// })

app.get('/',(req,res)=>{
    res.send("Backend is working")
})

app.listen(PORT, () => {console.log("Server running on port 4000")})



