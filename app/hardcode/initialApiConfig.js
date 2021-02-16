
const folder = process.platform === 'linux' ? "/home/pi/Music/" : "C:\\MUSIC\\"
const machineName = process.env.USERDOMAIN

export const  initialApiConfig = {
            "name": machineName,
            //"guid":"22345200abe84f6090c80d43c5f6c0f6",
            "domaiName":"music.inplay.pro",
            "storage": folder
}

