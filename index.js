var app = require('app');
var path = require('path');
var window = require('electron-window');

app.on('ready', function() {
	var screen = require('screen');
	var screenSize = screen.getPrimaryDisplay().workAreaSize;

	var appWindow = window.createWindow({
		width: screenSize.width,
		height: screenSize.height
	});

	appWindow.showUrl('https://devspace-app.firebaseapp.com/');
});