const express = require("express");

const app = express();

//# used to store a value in a name like a variable but it is more efficient and more expressive than variables
app.set("title", "Learned app.set")

app.get("/", (req, res) => {
    res.send(`<h1 style='text-align:center;font-size:50px'>${app.get("title")}</h1>`);
});


app.listen(3000, () => console.log("Server Started on port 3000"));
