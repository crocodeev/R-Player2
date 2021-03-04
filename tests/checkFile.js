const fs = require('fs');

const p = process.argv[2]

async function isFileExist(path) {

    await fs.promises.access(path, fs.constants.F_OK)
           .then(
               result => console.log(true),
               error => console.log(false))
       

}

isFileExist(p)

