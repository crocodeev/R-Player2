const rimraf = require('rimraf');
const path = require('path');

const content = process.argv[2];
const info = process.argv[3];



if(content === "content"){
    const folder = "C:\\MUSIC"

    rimraf(`${folder}\\*`, () => {
        console.log("Tracks in " + folder + " has been removed");
    });

}

if(info === "info"){
    const folder = "C:\MUSIC"

    rimraf(`${folder}\*`, () => {
        console.log(folder + " has been removed");
    });

}


const folder = path.join(process.env.APPDATA, "r-player");

rimraf(folder, () => {
    console.log(folder + " has been removed");
});
