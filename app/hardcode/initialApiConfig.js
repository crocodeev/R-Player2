const fs = require('fs');
const path = require('path');
const os = require('os');


const InitApiConfig = {

    domaiName: "music.inplay.pro",
    lastModifiedInterval: 1, //minutes
    title: "R-Player",
    defineMusicPath(){

        if(process.platform === 'linux'){
            this.storage =  path.join(process.env.HOME, 'Music');
        }else{
            this.storage =  path.join(process.env.HOMEDRIVE, process.env.HOMEPATH, 'Music');
        }
    
        return this;
    
    },
    defineMachineName(){

        if(process.env.USERDOMAIN){
            console.log("DOMAIN NAME IS EXIST",process.env.USERDOMAIN);
            this.name = process.env.USERDOMAIN;
            return this;
        }else{
            const hostname = os.hostname();
            console.log("DOMAIN NAME DOESN'T EXIST");
            this.name = hostname;
            const profilePath = path.join(process.env.HOME, '.profile');
            const variable = `USERDOMAIN=${hostname} \nexport USERDOMAIN`
    
            try {
        
                const data = fs.readFileSync(profilePath, 'utf8');
                
                if(!data.includes(variable)){
                    fs.appendFileSync(profilePath, variable, { 
                        encoding: 'utf8'});
                };
            
                return this;
                
            } catch (error) {
                console.log("ERROR FROM API CONFIG ", error);
            }
        }
    }
}

export const initialApiConfig = InitApiConfig.defineMusicPath();

