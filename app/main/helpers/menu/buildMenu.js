import createMenuTemplate from './createMenuTemplate';
import { Menu } from 'electron';



export default function createCustomMenu(webWindow) {
    
    const customTemplate = [{
        menuLabel: "File",
        selfLabel: 'Logout',
        action: () => {
          webWindow.send('logout');
        },
    }]

    const menuTemplate = createMenuTemplate(customTemplate);

    return Menu.buildFromTemplate(menuTemplate);
};