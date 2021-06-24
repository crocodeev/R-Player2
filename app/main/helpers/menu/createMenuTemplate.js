/**
 {
     menuLabel: String,
     selfLabel: String,
     action: Function
 }
*/

const menuTemplate = [
    {
        label: "File",
        submenu: [
            { role: 'quit' }
        ]
    },
    {
        label: "View",
        submenu: [
            { role: 'toggleDevTools' },
            { role: 'togglefullscreen' }
          ]
    },
    {
        label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
      ]
    }
]

function createSubmenuItem(item) {
    
    const { selfLabel, action } = item;
    
    const newSubmenuItem = {}

    newSubmenuItem.label = selfLabel;
    newSubmenuItem.click = action;

    return newSubmenuItem;
}

export default function createMenuTemplate(newMenuItems){

    if(newMenuItems.constructor === Array ){
        newMenuItems.forEach(element => {
            
            const obj = menuTemplate.find((item) => {
                return item.label === element.menuLabel;
            });

            if(!!obj){

                if(obj.hasOwnProperty('submenu')){
                    const newSubmenuItem = createSubmenuItem(element);
                    obj.submenu.unshift(newSubmenuItem);
                } 
            }            

        });
    }else{

       
        const obj = menuTemplate.find((item) => {
            return item.label === newMenuItems.menuLabel;
        });


        if(!!obj){

            if(obj.hasOwnProperty('submenu')){
                const newSubmenuItem = createSubmenuItem(newMenuItems);
                console.log(newSubmenuItem);
                obj.submenu.unshift(newSubmenuItem);
            } 
        }  

    }

    console.log(menuTemplate.submenu);

    return menuTemplate;
    
} 

