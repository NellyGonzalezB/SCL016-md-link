//Command Line Interface - Interfaz de Línea de Comando
const mdlinks = require('./index.js');
const pathLib = require('path')
const path = process.argv[2];
let firstOption = process.argv[3];
let secondOption = process.argv[4];
let dirPath = pathLib.resolve(path);
console.log(dirPath);

let options = {
    validate: false,
    stats: false
};

if (
    (firstOption === "--validate" && secondOption === "--stats") ||
    (firstOption === "--stats" && secondOption === "--validate")
) {
    options.validate = true;
    options.stats = true;
} else if (firstOption === "--validate") {
    options.validate = true;
    options.stats = false;
} else if (firstOption === "--stats") {
    options.validate = false;
    options.stats = true;
} else {
    options.validate = false;
    options.stats = false;
}

// let data = '';
mdlinks.mdlinks(dirPath, options)
.then(file => {
    console.log(file);
})
.catch(err => console.log('error', err));

