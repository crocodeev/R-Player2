
const folder = process.platform === 'linux' ? "/home/pi/Music/" : "C:\\MUSIC\\"
const machineName = process.env.USERDOMAIN

export const  initialApiConfig = {
            "name": machineName,
            "domaiName":"music.inplay.pro",
            "storage": folder,
            "lastModifiedInterval": 1
}

