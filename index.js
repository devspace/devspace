var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var shell = require('shell');

var mainWindow = null;

var appURL = 'https://app.devspace.io/';

if (process.env.DEBUG) {
  appURL = 'http://localhost:8000/';

  require('electron-debug')({
    showDevTools: true
  });
}

app.commandLine.appendSwitch("disable-renderer-backgrounding");

app.on('ready', function() {
  var screen = require('screen');
  var screenSize = screen.getPrimaryDisplay().workAreaSize;

  var mainWindow = new BrowserWindow({
    width: screenSize.width,
    height: screenSize.height,
    webPreferences: {
      nodeIntegration: false
    }
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

  mainWindow.loadURL(appURL);
  mainWindow.show();

  Menu.setApplicationMenu(Menu.buildFromTemplate(require('./menu')));
});

app.on('window-all-closed', function() {
  app.quit();
});