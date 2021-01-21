/*
async function
arg - path to encrypted file
return - url
*/

const fs = require('fs');
const toBlobURL = require('stream-to-blob-url');
const crypter = require('../../utils/crypter');

async function decryptSource(src) {
    
    const input = fs.createReadStream(src)
    const decipher = crypter.getDecipher()

    const url = await toBlobURL(input.pipe(decipher))

    return url
}

module.exports = decryptSource