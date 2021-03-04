const fs = require('fs');

export default async function isFileExist(path) {

    return fs.promises.access(path, fs.constants.F_OK)
           .then(result => true,
                 error => false)

}