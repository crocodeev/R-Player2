const rimraf = require('rimraf');
const path = require('path');

const folder = path.join(process.env.APPDATA, "r-player");

rimraf(folder, () => {
    console.log(folder + " has been removed");
});
