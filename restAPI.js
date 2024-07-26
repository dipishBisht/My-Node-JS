const express = require("express");
const fs = require("fs");

const app = express();

const mockData = JSON.parse(fs.readFileSync("mockData2.json", "utf-8"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.get("/users", (req, res) => {
    const data = `<ul>${mockData.map((data) => `<li>${data.first_name}</li>`).join("")}</ul>`
    res.send(data)
})

app.get("/api/users", (req, res) => {
    res.send(mockData)
})

app.post("/api/users", (req, res) => {
    const body = req.body
    mockData.push({ id: mockData.length + 1, ...body });
    fs.writeFile("mockData2.json", JSON.stringify(mockData), (err, data) => {
        return res.json({ status: "sucess", id: mockData.length })
    });
})

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const findUser = mockData.find((data) => data.id === id)
        res.send(findUser);
    })
    .put((req, res) => {
        const id = Number(req.params.id);
        const updatedData = req.body;
        updatedData.id = Number(updatedData.id);

        const user = mockData.find((data) => data.id === id);

        if (user) {
            Object.assign(user, updatedData);

            fs.writeFile("mockData2.json", JSON.stringify(mockData), (err) => {
                if (err) {
                    return res.status(500).json({ status: "error", message: "Failed to update data" });
                }
                res.json({ status: "success", id });
            });
        } else {
            res.status(404).json({ status: "error", message: "User not found" });
        }
    })
    .patch((req, res) => {
        const body = req.body
        const id = Number(req.params.id)
        const user = mockData.findIndex((users) => users.id === id)
        if (user === -1)
            res.json({ status: "error", message: "No User Found" });

        const updatedData = { ...mockData[user], ...body }
        mockData[user] = updatedData;
        fs.writeFile("mockData2.json", JSON.stringify(mockData), (err) => {
            if (err)
                return res.status(500).json({ status: "error", message: "Failed to update data" });

            res.json({ status: "sucess", id })
        })
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const filtered = mockData.filter((users) => id !== users.id);
        fs.writeFile("mockData2.json", JSON.stringify(filtered), (ee, data) => {
            return res.json({ status: "sucess", id: id })
        })
    });

app.listen(8055, () => console.log("Server Started"))