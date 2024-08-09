console.log("New File Loaded");

// const data = {
//     name: 'Dipish',
//     age: 19
// }
const data = 12;
const name = "Dipish";

//syntax 1 : we can export more than one data ==> all the data combined will form an object when imported
// exports.a=data;
// exports.name=name;

//syntax 2 ==> if we want to export more than one data ==> we need to export it in the form of key value pair in this syntax. otherwise only the last data will be exporrted.
module.exports = {
    data, name
}
//if we want to change the key name :
module.exports = {
    xyz : data,
    yzx : name
}