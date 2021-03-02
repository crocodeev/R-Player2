const fs = require('fs');

const p = process.argv[2]

async function isFileExist(path) {

    return fs.promises.access(path)
           .then((message) => console.log(message))

}

isFileExist(p)

