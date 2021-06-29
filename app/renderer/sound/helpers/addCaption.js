/**
 * add caption for proper display name of commercial
 */

export default function addCaption(item) {

    if(item.author){
       return item.caption = item.author + " - " + item.title; 
    }

    return item.caption = item.title; 
    
}