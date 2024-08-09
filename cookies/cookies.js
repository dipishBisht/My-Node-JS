const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());





app.get('/cookieset', function (req, res) {
    res.cookie('cookie_name', 'cookie_value');
    res.cookie('company', 'javatpoint');
    res.cookie('name', 'sonoo');

    res.status(200).send('Cookie is set');
});

app.get('/cookieget', function (req, res) {
    res.status(200).send(req.cookies);
});

app.get('/', function (req, res) {
    res.status(200).send('Welcome to JavaTpoint!');
});


app.listen(8000, () => console.log('Server started at Port 8000'));  