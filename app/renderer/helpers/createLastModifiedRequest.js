export default function createLastModifiedRequest(store, callback) {

    const webapi = store.getState().webapi;

    const arg = {};
  
    arg.token = webapi.token;
    arg.channel = webapi.currentChannel;

    return callback(arg);
    
}