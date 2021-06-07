const { app, BrowserWindow, Menu, dialog } = require("electron");
const { readFile } = require("fs/promises");

if (require("electron-squirrel-startup")) return app.quit();
let win = null;

function createWindow() {
    const oldWin = win;
    
    win = new BrowserWindow({
	width: 800,
	height: 600,
    });

    win.loadFile("index.html");

    oldWin?.destroy();
}

const openFile = async () => {
    try {
	const { filePaths, canceled }
	      = await dialog.showOpenDialog({ properties: ["openFile"]});
	if (canceled)
	    return;
	const fileText
	      = await readFile(filePaths[0], 'utf8');
	console.log(fileText);
    } catch (err) {
	console.error(err);
    }
};

const saveFile = async () => {
    try {
	const { filePath, canceled }
	      = await dialog.showSaveDialog({ });
	if (canceled)
	    return;
	console.log(filePath);
    } catch (err) {
	console.error(err);
    }
};

const saveFileAs = async () => {};

const showHelpAbout = () => {
    dialog.showMessageBox(null, {
	message: "HelloWorld",
	type: "info",
	buttons: ["OK"],
    });
};

app.whenReady().then(() => {
    const isMac = process.platform === "darwin";
    const template = [
	{
	    label: "&File",
	    submenu: [
		{ label: "&New", click: async () => createWindow() },
		{ label: "&Open", click: () => openFile() },
		{ label: "&Save", click: () => saveFile() },
		{ label: "Save &As", click: () => saveFileAs() },
		{ type: "separator" },
		isMac ? { role: "close" } : { role: "quit" },
	    ],
	},
	{
	    label: "&Help",
	    submenu: [{ label: "About", click: () => showHelpAbout() }],
	},
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    createWindow();

    app.on("activate", function () {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
