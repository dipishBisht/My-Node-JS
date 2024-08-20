const express = require("express")
const { query, validationResult, matchedData } = require("express-validator")
const app = express();

app.get("/", query('name').notEmpty().escape(), (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        const data = matchedData(req);
        console.log(data);
        console.log("Yuvraj *******");
        
        return res.send(`Hello, ${data.name}!`);
    }

    res.send({ errors: result.array() });
})

app.listen("3000", () => console.log("Server started at port 3000"))