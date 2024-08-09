const http = require('http')

const server = http.createServer((req, res) => {
    const { url } = req;

    switch (url) {
        case '/':
            res.write('<h1>Welcome to our page</h1>')
            break;
        case '/about':
            res.write('<h1>Welcome to About Page</h1>')
            break;
        case '/contact':
            res.write('<h1>Welcome to Contact page</h1>')
            break;
        default:
            res.write('<h1>404 Not Found</h1>')
    }
    res.end()
})

server.listen(3000, () => console.log("Server Started"))