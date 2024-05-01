const fs = require('fs');
const os = require('os');
const notes = require('./new');
const _=require('lodash');


console.log(notes.data.name,notes.data.age);
fs.appendFile('greeting.txt', 'Hello User\n', (err) => {
    console.log("file created");
    if (err) { console.log(err) }
})

console.log(_.isString(notes.data.name));