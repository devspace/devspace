var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('ready', function() {
  var screen = require('screen');
  var screenSize = screen.getPrimaryDisplay().workAreaSize;

  var mainWindow = new BrowserWindow({
    width: screenSize.width,
    height: screenSize.height
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.show();
  });

  mainWindow.loadURL('https://devspace-app.firebaseapp.com/');
});