import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from "./routes/rooms.js";
const app = express()
dotenv.config()

// const connect = async () => {
//     try {
//         await mongoose.connect(process.env.DB_URL);
//         console.log("MongoDB is connected")
//     } catch (error) {
//         throw error;
        
//     }
// }
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err));

//middlewares
    app.use("/api/auth",authRoute)
    app.use("/api/users",usersRoute)
    app.use("/api/hotels", hotelsRoute);
    app.use("/api/rooms",roomsRoute)

app.listen(process.env.PORT, () => {
    // connect()
    console.log(`Express app running on port ${process.env.PORT}` );
})