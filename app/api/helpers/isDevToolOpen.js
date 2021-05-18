export default function isDevToolOpen(){

    const heightThreshold = 59;
    const widthThreshold = 16

    if(window.outerHeight - window.innerHeight > heightThreshold){
        return true;
    }

    if(window.outerWidth - window.innerWidth > widthThreshold){
        return true;
    }
    
    return false;
}