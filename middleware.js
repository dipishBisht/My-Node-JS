const express = require("express")
const app = express();

app.use((req, res, next) => {
    console.log("On Middleware 1");
    res.send("Middleware 1")
    next();
})

app.use((req, res, next) => {
    console.log("On Middleware 2");
    req.body = { name: "Dipish", age: 19 }
    next()
})

app.get("/", (req, res) => {
    console.log("Home page");
    console.log(req.body);
})

app.listen(8055, () => console.log("Server started at post 8055"));