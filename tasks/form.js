const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    const { url } = req;
    const { method } = req;

    if (url === '/') {
        res.write("<html><body><form action='/senddata' ><input type='text' placeholder='Enter First Name' name='data'><input type='text' placeholder='Enter Second Name' name='data'><select><option>Web</option><option>Graphic</option><option>Game</option><option>App</option></select><button>Send</button> </form></body></html>")
    }

    // if()
    res.end();
})

server.listen(7777, () => console.log("Server Started"))

