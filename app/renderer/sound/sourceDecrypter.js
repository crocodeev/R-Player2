/*
async function
arg - path to encrypted file
return - url
*/

const fs = require('fs');
const toBlobURL = require('stream-to-blob-url');
const crypter = require('../../utils/crypter');

async function decryptSource(src) {
    
    console.log(src);
    console.time("DECRYPT");
    const input = fs.createReadStream(src)
    const decipher = crypter.getDecipher()
    decipher.on('end', () => console.log("DECIPER END"))

    const url = await toBlobURL(input.pipe(decipher))
    console.timeEnd("DECRYPT");
    return url
}

module.exports = decryptSource