const fetch = require('electron-fetch').default;


async function sendDownloadStatus(){

    const raw = JSON.stringify([]);

    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Cookie: `uid=bb244b6bf2e4b128881c8aa551810b92a6459992`
        },
        body: raw,
        redirect: 'follow'
        };
    
        try {
            const responce = await fetch(`http://music.inplay.pro/api/campaign/tracks/?channel=292`, requestOptions);
            console.log(responce.body);
            const result =  await responce.json();

            console.log(result);
            
        } catch (error) {
            console.log("ERROR FROM sendDownloadStatus:");
            console.log(error.name);
            console.log(error.message);
            console.log(error.stack);
        }         

}

sendDownloadStatus()