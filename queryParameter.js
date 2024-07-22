const express = require("express");
const fs = require("fs");
const _ = require("lodash");

const app = express();

const usersData = JSON.parse(fs.readFileSync("mockData.json", "utf-8"));

app.get("/", (req, res) => {
    res.send("You are on Home Page");
});

app.get("/users", ({ query }, res) => {
    const { id, name } = query;

    if (id === name) return res.send(usersData)
    if (id && isNaN(id)) res.send("Invalid Request")
    if (name && !isNaN(name)) res.send("Invalid Request")

    let filteredData;

    if (id && name) {
        filteredData = usersData.filter((user) => _.lowerCase(user.name).startsWith(_.lowerCase(name)) && user.id === Number(id))
    }
    else if (id) {
        filteredData = usersData.filter((user) => user.id === Number(id))
    }
    else if (name) {
        filteredData = usersData.filter((user) => _.lowerCase(user.name).startsWith(_.lowerCase(name)))
    }
    filteredData.length ? res.send(filteredData) : res.send("Invalid User");
});


app.listen(3000, () => console.log("Server Started"));