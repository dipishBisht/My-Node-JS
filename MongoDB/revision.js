const express = require("express");
const mongoose = require("mongoose");
import { z } from "zod";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/temp").then("Connected to DB").catch(err => console.log(err));

const User = mongoose.model("tempUsers", {
    name: String,
    email: String,
    password: String
});

app.get("/getusers", async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).send(allUsers)
    } catch (error) {
        res.status(500).json({ status: "error", message: "Unexpected Error Occured" })
    }
})

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ status: "error", message: "Not all credentials passed" })

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ status: "error", message: "User with this email already exists" });
    } catch (error) {
        return res.json({ status: "error", message: "Unexpected error" });
    }
    const user = new User({ name, email, password })
    user.save();
    return res.status(201).json({ status: "success", message: "User created successfully" });
})

app.listen(3000, () => console.log("Server started at port 3000"));