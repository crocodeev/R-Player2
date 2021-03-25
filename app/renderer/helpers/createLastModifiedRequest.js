export default function createLastModifiedRequest(store, callback) {

    const webapi = store.getState().webapi;

    

    if(webapi.currentChannel && webapi.token){

        const arg = {};
        arg.token = webapi.token;
        arg.channel = webapi.currentChannel;

        callback(arg);
    }

    return;
    
}