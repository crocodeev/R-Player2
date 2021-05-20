import path from 'path';
import { app, crashReporter, BrowserWindow, Menu, Tray } from 'electron';
import { createStore,
         applyMiddleware,
         combineReducers } from 'redux';
import MPC from '../api/mainProcessListener'
import API from '../api/api';
import { initialApiConfig } from '../hardcode/initialApiConfig'
import AutoLaunch from 'auto-launch'


//for activate development mode
const isDevelopment = process.env.NODE_ENV === 'development';

//if production, enable autolaunch
if(!isDevelopment){ 
  const autolauncher = new AutoLaunch({
  name: "r-player"
})

autolauncher.isEnabled()
.then(function(isEnabled){
    if(isEnabled){
        return;
    }
    autolauncher.enable();
})
.catch(function(err){
    console.log("Autolauncher: " + error);
});
}


const api = new API(initialApiConfig);
const mpc = new MPC();

//store works

import { forwardToRenderer,
         replayActionMain,
          } from 'electron-redux';
import player from '../store/reducers/player';
import webapi from '../store/reducers/api';
import schedule from '../store/reducers/schedule';
import thunk from 'redux-thunk';


const initialState = {
}

const store = createStore(combineReducers({player, webapi, schedule}),
                          initialState,
                          applyMiddleware(thunk,
                                          forwardToRenderer));

replayActionMain(store);


mpc.init(api, store);

let mainWindow = null;
let tray = null;
let forceQuit = false;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false,
});


app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    minWidth: 640,
    minHeight: 480,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')));

  // show window once on first load
  /*
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
  });
  */

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
        }
      });

      app.on('activate', () => {
        mainWindow.show();
      });

      app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    }
  });

  if (isDevelopment) {
    // auto-open dev tools
    //mainWindow.webContents.openDevTools();

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click() {
            mainWindow.inspectElement(props.x, props.y);
          },
        },
      ]).popup(mainWindow);
    });
  }

  mainWindow.on('show', () => {
    mpc.enableAutoHide(mainWindow.webContents);
  })


  try {
    tray = new Tray(path.join(__dirname, '../icons/tray.png'));
    tray.setToolTip('Click to show or hide');
    tray.on('click', () => {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    })

    mpc.acceptAutoHide(mainWindow);
  } catch (error) {
    console.error("TRAY ERROR: ", error);
  }
  

});



