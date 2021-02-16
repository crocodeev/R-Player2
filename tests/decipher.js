const crypter = require('../app/utils/crypter')
const fs = require('fs')
const readPath = process.argv[2]
const writePath = process.argv[3]


function decrypt() {
    
    const input = fs.createReadStream(readPath)
    const decipher = crypter.getDecipher()
    const output = fs.createWriteStream(writePath)

    input.pipe(decipher).pipe(output)

}

decrypt()