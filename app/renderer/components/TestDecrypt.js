import { func } from 'prop-types';
import React from 'react'
const {Howl, Howler} = require('howler');
const fs = require('fs');
const streamToBlob = require('stream-to-blob');
const Crypter = require('../../utils/crypter');

const crypter = new Crypter()

export default function DecryptAndPlay(){

    const path = "C:\\MUSIC\\A Band Called Success - How We Do_1.mp3"

    async function decryptAndPlay() {

        console.log("Start decryp and play")
        let buffer = new Buffer('')
        const decipher = crypter.getCipher()
        const input = fs.createReadStream(path)
        const output = fs.createWriteStream(buffer)
        
        input.pipe(decipher).pipe(output)

        output.on('close', () => {
            console.log(buffer)
        })
        
        /*const url = URL.createObjectURL(blob)

        console.log("URLLLLLL");
        console.log(url)

        const sound = new Howl({
            src:url,
            format:["mp3"]
        })

        sound.play()

        console.log(sound)*/


    }
    




    return(
        <a className="waves-effect waves-light btn-small supersmall" onClick={decryptAndPlay}>
          DecryptAndPlay
        </a>
    )
}