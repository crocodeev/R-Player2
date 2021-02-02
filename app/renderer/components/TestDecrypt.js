import { func } from 'prop-types';
import React from 'react'
const {Howl, Howler} = require('howler');
const fs = require('fs');
const streamToBlob = require('stream-to-blob');
const toBlobURL = require('stream-to-blob-url')
const crypter = require('../../utils/crypter');


export default function DecryptAndPlay(){

    const path = "C:\\MUSIC\\0a049a90ae8e6a4f7d62a6315130688c847a33db"

    async function decryptAndPlay() {

       
        const input = fs.createReadStream(path)
        const decipher = crypter.getDecipher()
        const output = fs.createWriteStream("C:\\Music\\1.mp3")

        /*input.pipe(decipher)

        console.log(input.pipe(decipher));

        const blob = streamToBlob(input.pipe(decipher))

        console.log(typeof blob)

        const url = URL.createObjectURL(blob)*/

        const url = await toBlobURL(input.pipe(decipher))

        console.log("URLLLLLL");
        console.log(url)

        const sound = new Howl({
            src:url,
            format:["mp3"]
        })

        sound.play()

        URL.revokeObjectURL(url)

        console.log(sound)


    }
    




    return(
        <a className="waves-effect waves-light btn-small supersmall" onClick={decryptAndPlay}>
          DecryptAndPlay
        </a>
    )
}