const fs = require('fs');
const os = require('os');
const notes = require('./new');
const _ = require('lodash');

const { name, age } = notes;
console.log(name, age);
fs.appendFile('greeting.txt', 'Hello User\n', (err) => {
    console.log("file created");
    if (err) { console.log(err) }
})