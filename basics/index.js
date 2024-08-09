const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const { url } = req;
    const { method } = req;
    if (url === '/') {
        res.write("<html><body><form action='/data' method='POST'><input type='text' name='message' placeholder='Enter First Name'><input type='text' name='message' placeholder='Enter Second Name'><button>Submit</button></form></body></html>");
        res.end();
    }
    if (url === '/data' && method === 'POST') {

        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const daString = Buffer.concat(body).toString();
            const name = daString.replaceAll('message=', '').split('&');
            fs.writeFile("../json/data.json", JSON.stringify({ "firstName": name[0], "lastName": name[1] }), (err) => {
                if (err) {
                    console.log("Error", err);
                    res.statusCode = 500;
                    res.end("Internal Server Error")
                } else {
                    res.setHeader('Content-Type', 'text/html');
                    res.write("<h1>Thank you for sending your Response :)</h1>");
                    res.end();
                }
            });
        });
    }
});
server.listen(3000, () => console.log("Server Started"));