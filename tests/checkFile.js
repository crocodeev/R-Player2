const fs = require('fs');

const p = process.argv[2]

async function isFileExist(path, ) {

<<<<<<< HEAD
    return fs.promises.stat(path)
           .then((message) => console.log(message))
=======
    await fs.promises.access(path, fs.constants.F_OK)
           .then(
               result => console.log(true),
               error => console.log(false))
       
>>>>>>> 9b9c7ccc647f520b77367c66cf81c9995b3f8933

}

isFileExist(p)

