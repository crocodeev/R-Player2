const fs = require('fs');
const path = require('path');
const os = require('os');

export const initialApiConfig = new InitApiConfig();


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
    const profilePath = path.join(process.env.HOME, '.profile');
    const variable = `USERDOMAIN=${hostname} \nexport USERDOMAIN`

    try {

        const data = fs.readFileSync(profilePath, 'utf8');
        
        if(!data.includes(variable)){
            fs.appendFileSync(profilePath, variable, { 
                encoding: 'utf8'});
        };
      
        
    } catch (error) {
        console.log("ERROR FROM API CONFIG ", error);
    }

    return hostname;

}
