import { config } from 'process';
import isObjectEmpty from '../utils/isObjectEmpty';
const fs = require('fs');
const path = require('path');
const os = require('os');

const configObj = {};

export const initialApiConfig = new InitApiConfig();


function InitApiConfig() {

    if(isObjectEmpty(configObj)){
        configObj.name = defineMachineName();
        configObj.domaiName = "music.inplay.pro";
        configObj.storage = defineMusicPath();
        configObj.lastModifiedInterval = 1;
        return configObj;
    }

    return configObj
    
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
        profileFile.write(`USERDOMAIN=${hostname} \nexport USERDOMAIN`);
        profileFile.end();
        profileFile.close();
        
    } catch (error) {
        console.log("ERROR FROM API CONFIG ", error);
    }

    return hostname;

}
