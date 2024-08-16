const express = require("express");
const mongoose = require("mongoose");

const app = express();


//* connection

mongoose.connect("mongodb://127.0.0.1:27017/users-data")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Error:", err));



// * Event Listners

//#  const db = mongoose.connection;

//#  db.on("connected", () => console.log("Connected to MongoDB server."))

//#  db.on("error", (err) => console.error("MongoDB connection error :", err))

//#  db.on("disconnected", () => console.log("Disconnected to MongoDB server."))

//* Schema

const userSchema = new mongoose.Schema({
    firstName: { type: String, reqired: true },
    lastName: { type: String },
    email: { type: String, reqired: true, unique: true },
    jobTitle: { type: String },
    gender: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.get("/users", async (req, res) => {
    try {
        const allUsers = await User.find({});
        const data = `<ul>${allUsers.map((data) => `<li>${data.firstName}</li>`).join("")}</ul>`
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

app.route("/api/users")
    .get(async (req, res) => {
        try {
            const allUsers = await User.find({});
            res.send(allUsers);
        } catch (error) {
            res.json({ status: "error", message: error.message })
        }
    })
    .post(async (req, res) => {
        const body = req.body;
        if (body && body.firstName && body.email && body.gender) {
            try {
                const result = await User.create(body)
                if (result) return res.status(201).json({ status: "success", message: "User Created" })
                return res.status(400).json({ status: "error", message: "User not created" })
            } catch (error) {
                return res.status(500).json({ status: "error", message: error })
            }
        }

        return res.status(400).json({ status: "error", message: "Bad request" });
    })

app.route("/api/users/:id")
    .get(async (req, res) => {
        try {
            const id = req.params.id;
            const findUser = await User.findById(id)
            if (!findUser) {
                return res.status(404).json({ status: "error", message: "User not found" });
            }
            res.status(200).json(findUser);
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message })
        }
    })
    .put(async (req, res) => {
        const id = req.params.id;
        const updatedData = req.body;
        try {
            if (!updatedData.firstName || !updatedData.email || !updatedData.gender) {
                return res.status(400).json({ status: "error", message: "Bad request" });
            }

            const user = await User.findByIdAndUpdate(id, updatedData, { new: true, overwrite: true, runValidators: true });

            if (!user) {
                return res.status(404).json({ status: "error", message: "User not found" });
            }
            res.status(200).json({ status: "success", message: "Data updated successfully", user })
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    })
    .patch(async (req, res) => {
        const id = req.params.id;
        const updatedData = req.body;
        try {
            const user = await User.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
            if (!user) {
                return res.status(404).json({ status: "error", message: "User not found" });
            }
            res.status(200).json({ status: "success", message: "Data updated successfully", user });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    })
    .delete(async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ status: "error", message: "User not found" });
            }
            res.status(200).json({ status: "success", message: "User deleted successfully", user });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    });

app.listen(8055, () => console.log("Server Started"))