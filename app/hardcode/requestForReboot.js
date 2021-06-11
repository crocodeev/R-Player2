const { dialog } = require('electron');

export default function requestForReboot(browserWindow){

    if(process.env.USERDOMAIN){
        return;
    }

    const result = dialog.showMessageBoxSync(browserWindow,{
        message: "Please, reboot your pc",
        type: "info",
        buttons: ["OK"]
    })
    
}