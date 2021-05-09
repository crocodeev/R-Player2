
const fs = require('fs');
const path = require('path');

const folder = process.platform === 'linux' ? linuxMusicPath() : "C:\\MUSIC\\"
console.log("PATH ",folder);
const machineName = process.env.USERDOMAIN
console.log("MACHINE ", machineName);

export const  initialApiConfig = {
            "name": machineName,
            "domaiName":"music.inplay.pro",
            "storage": folder,
            "lastModifiedInterval": 1
}

function linuxMusicPath(){
    return path.join(process.env.HOME, 'Music');
}
