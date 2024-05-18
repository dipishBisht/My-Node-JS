const num = require("./new") //.new => file path ==> everything that is export by new will be stored in num
//although the whole new file is imported and the whole code of new.js will run when export is executed

console.log(num);       //# num is a object
//if we want only data from num and not name ==> console.log(num.data)

// syntax 2
const { name } = require("./new")
//object destructing ==> only the name is imported ==> name is key so the value of name in exported object will be imported

console.log(name);