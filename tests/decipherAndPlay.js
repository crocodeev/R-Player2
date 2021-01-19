const {Howl, Howler} = require('howler');
const fs = require('fs');
const streamToBlob = require('stream-to-blob');
const Crypter = require('../app/utils/crypter');

const crypter = new Crypter();

const filePath = process.argv[2];

async function decipherAndPlay() {
    
    const input = fs.createReadStream(filePath);
    //const decipher = crypter.getCipher();
    const blob = await streamToBlob(input);
    const url = new URL(blob);

    const sound = new Howl({
        src: url
    })

    sound.play();

}

decipherAndPlay()