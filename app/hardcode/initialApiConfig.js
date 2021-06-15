
const fs = require('fs');
const path = require('path');
const os = require('os');


export const  initialApiConfig = new InitApiConfig();

function InitApiConfig() {
    this.name = defineMachineName();
    this.domaiName = "music.inplay.pro";
    this.storage = defineMusicPath();
    this.lastModifiedInterval = 1;
}

function defineMusicPath(){

    if(process.platform === 'linux'){
        return path.join(process.env.HOME, 'Music');
    }

    return path.join(process.env.HOMEDRIVE, process.env.HOMEPATH, 'Music')

}

function defineMachineName(){

    if(process.env.USERDOMAIN){
        console.log("DOMAIN NAME IS EXIST",process.env.USERDOMAIN);
        return process.env.USERDOMAIN;
    }

    const hostname = os.hostname();
    console.log("DOMAIN NAME DOESN'T EXIST");
    try {

        const profilePath = path.join(process.env.HOME, '.profile');
        const profileFile = fs.createWriteStream(profilePath, { flags: 'a' });
        profileFile.write(`USERDOMAIN=${hostname} \n export USERDOMAIN`);
        profileFile.end();
        profileFile.close();
        
    } catch (error) {
        console.log("ERROR FROM API CONFIG ", error);
    }

    return hostname;

}
