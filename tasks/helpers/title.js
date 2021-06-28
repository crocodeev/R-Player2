
module.exports =  function createTitle() {

    const version = require('../../package.json').version;
    const title = `R-Player ${version}`;
    return title;
    
}

