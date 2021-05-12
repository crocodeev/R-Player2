
const fs = require('fs');
const path = require('path');

const folder = defineMusicPath();
console.log("PATH ",folder);
const machineName = process.env.USERDOMAIN
console.log("MACHINE ", machineName);

export const  initialApiConfig = {
            "name": machineName,
            "domaiName":"music.inplay.pro",
            "storage": folder,
            "lastModifiedInterval": 1
}

function defineMusicPath(){

    if(process.platform === 'linux'){
        return path.join(process.env.HOME, 'Music');
    }

    return path.join(process.env.HOMEDRIVE, process.env.HOMEPATH, 'Music')

}
