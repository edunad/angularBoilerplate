const path = require('path');
const electron = require('electron');
const os = require('os');

var spawn = require('child_process').spawn;

const {app, Tray, Menu, BrowserWindow, shell, protocol, webContents, ipcMain, globalShortcut} = electron;

// prevent window being garbage collected
let mainWindow = null;
let appIcon = null;

/*
// Uncomment to only allow one instance of the same app
if(app != null){
  const shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory){});
  if (shouldQuit) {
    app.quit();
    return;
  }
}
*/

function createMainWindow() {
  var win = new BrowserWindow({
	  width: 425,
    height: 510,
    frame: false,
    center: true,
    resizable: false,
    title: 'Angular app',
    titleBarStyle: 'hidden',
    show: false
  });

  // Startup
  win.loadURL('file://' + path.join(__dirname, './index.html'));

	win.webContents.on('did-finish-load', function() {
	  win.show();
	});

	win.webContents.on('crashed', function(event){
	  console.log( '== Crashed ==');
	  console.log( event );
	});

	// Open the DevTools.
	win.webContents.openDevTools({
		detach: true
	});

  return win;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
      app.quit();
});

app.on('activate', function(){
  if (!mainWindow)
    mainWindow = createMainWindow();
});

app.on('ready', function(){
  if (!mainWindow)
    mainWindow = createMainWindow();
});
