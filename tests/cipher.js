const crypter = require('../app/utils/crypter')
const fs = require('fs')
const readPath = process.argv[2]
const writePath = process.argv[3]


function encrypt() {
    
    const input = fs.createReadStream(readPath)
    const cipher = crypter.getCipher()
    const output = fs.createWriteStream(writePath)

    input.pipe(cipher).pipe(output)

}

encrypt()