var app = require('app');

var template = [
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Undo',
				accelerator: 'CmdOrCtrl+Z',
				selector: 'undo:'
			},
			{
				label: 'Redo',
				accelerator: 'Shift+CmdOrCtrl+Z',
				selector: 'redo:'
			},
			{
				type: 'separator'
			},
			{
				label: 'Cut',
				accelerator: 'CmdOrCtrl+X',
				selector: 'cut:'
			},
			{
				label: 'Copy',
				accelerator: 'CmdOrCtrl+C',
				selector: 'copy:'
			},
			{
				label: 'Paste',
				accelerator: 'CmdOrCtrl+V',
				selector: 'paste:'
			},
			{
				label: 'Select All',
				accelerator: 'CmdOrCtrl+A',
				selector: 'selectAll:'
			}
		]
	},
	{
		label: 'View',
		submenu: [
			{
				label: 'Reload',
				accelerator: 'CmdOrCtrl+R',
				click: function(item, focusedWindow) {
					if (focusedWindow)
						focusedWindow.reload();
				}
			},
			{
				label: 'Toggle Full Screen',
				accelerator: (function() {
					if (process.platform == 'darwin')
						return 'Ctrl+Command+F';
					else
						return 'F11';
				})(),
				click: function(item, focusedWindow) {
					if (focusedWindow)
						focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
				}
			}
		]
	},
	{
		label: 'Window',
		role: 'window',
		submenu: [
			{
				label: 'Minimize',
				accelerator: 'CmdOrCtrl+M',
				role: 'minimize'
			},
			{
				label: 'Close',
				accelerator: 'CmdOrCtrl+W',
				role: 'close'
			}
		]
	},
	{
		label: 'Help',
		role: 'help',
		submenu: [
			{
				label: 'Learn More',
				click: function() { require('electron').shell.openExternal('https://devspace.io') }
			}
		]
  }
];

if (process.platform == 'darwin') {
	template.unshift({
		label: 'DevSpace',
		submenu: [
			{
				label: 'About DevSpace',
				role: 'about'
			},
			{
				type: 'separator'
			},
			{
				label: 'Hide DevSpace',
				accelerator: 'Command+H',
				role: 'hide'
			},
			{
				label: 'Hide Others',
				accelerator: 'Command+Alt+H',
				role: 'hideothers'
			},
			{
				label: 'Show All',
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				label: 'Quit',
				accelerator: 'Command+Q',
				click: function() { app.quit(); }
			}
		]
	});

	template[3].submenu.push(
		{
			type: 'separator'
		},
		{
			label: 'Bring All to Front',
			role: 'front'
		}
	);
}

module.exports = template;