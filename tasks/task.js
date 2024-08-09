const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {

    return res.send("<div style='height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center'><h1>You are on home page</h1><a href='/contact'>Go to Contact Page</a></div>");
})

app.get("/about", (req, res) => {
    return res.send("You are on About Page");
})

app.get("/contact", (req, res) => {
    fs.readFile("form.html", "utf-8", (err, data) => {
        if (err) res.send(err)
        return res.send(data);
    })
})

app.post("/contact/userdata", (req, res) => {
    const { first_name, last_name, email, message } = req.body
    const userData = { first_name, last_name, email, message }
    const allData = JSON.parse(fs.readFileSync("../json/formData.json", "utf-8"))
    if (allData) {
        allData.push(userData);
        fs.writeFileSync("../json/formData.json", JSON.stringify(allData))
        res.send("Data Send")
    }
    else {
        fs.writeFileSync("../json/formData.json", JSON.stringify([userData]));
    }
    res.send("Response Send")
});



app.listen(8055, () => console.log("Server Started"))