// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./route/user.route.js";
import messageRoute from "./route/message.route.js";
import path from "path";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";
dotenv.config();
const PORT = process.env.PORT || 5002;
const URI = process.env.MONGODB_URI;
app.use(cors({origin: 'http://localhost:4001',
  credentials: true}));
try{
    mongoose.connect(URI)
    .then(console.log("MongoDB Connected"))
    .catch(err=>console.log(err))
}
catch(error){
    console.log(error);
}
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/message", messageRoute);

//--------------- code for deployment --------------------------
if(process.env.NODE_ENV === 'production'){
    const dirPath = path.resolve();
    app.use(express.static(path.join(dirPath, "Frontend", "dist")));
    app.get("*", (req, res)=>{
        res.sendFile(path.join(dirPath, "Frontend", "dist", "index.html"));
    });
}


server.listen(PORT, ()=>{
    console.log(`Example app listening on port ${PORT}`);
})