const fs = require('fs');
const path = require('path');
const os = require('os');

export default function defineMachineName(){

    if(process.env.USERDOMAIN){
        console.log("DOMAIN NAME IS EXIST",process.env.USERDOMAIN);
        return process.env.USERDOMAIN;
    }

    console.log("DOMAIN NAME DOESN'T EXIST");
    const hostname = os.hostname();
    const profilePath = path.join(process.env.HOME, '.profile');
    const enviromentVariable = `USERDOMAIN=${hostname} \nexport USERDOMAIN`;

    const data = fs.readFileSync(profilePath, 'utf8');
                
        if(!data.includes(variable)){
            fs.appendFileSync(profilePath, enviromentVariable, { 
            encoding: 'utf8'});
            };
    return hostname;        
}