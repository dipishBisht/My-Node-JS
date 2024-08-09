const express = require("express");
const fs = require("fs");
const _ = require("lodash");

const app = express();


const data = JSON.parse(fs.readFileSync("../json/mockData.json", "utf-8"));

app.get("/", (req, res) => {
    res.send("You are in the Home Page")
})

app.get("/users", (req, res) => {
    res.send(data)
})

app.get("/users/:name", ({params}, res) => {
    const { name } = params;

    if (!isNaN(name)) res.send("Invalid Request")

    const filteredData = data.filter(({ firstName }) => _.lowerCase(firstName) === _.lowerCase(name));
    
    res.send(filteredData.length ? filteredData : "No User Found");
});


app.listen(3000, () => console.log("Server Started on port 3000"));
