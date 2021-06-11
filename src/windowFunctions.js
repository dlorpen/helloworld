const {
  openFile,
  saveFile,
  saveFileAs,
  showHelpAbout,
} = require("./dialogFunctions");
const { BrowserWindow, Menu } = require("electron");
const path = require("path");

let win = null;

module.exports = {
  createWindow: () => {
    const oldWin = win;

    const pathToPreload = path.join(__dirname, "./preload.js");

    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: pathToPreload,
        nodeIntegration: false,
        enableRemoteModule: false,
        contextIsolation: true,
        sandbox: true,
      },
    });

    win.loadFile("./src/index.html");

    oldWin?.destroy();
  },

  createMenu: () => {
    const isMac = process.platform === "darwin";
    const template = [
      {
        label: "&File",
        submenu: [
          { label: "&New", click: async () => createWindow() },
          { label: "&Open", click: () => openFile(win) },
          { label: "&Save", click: () => saveFile(win) },
          { label: "Save &As", click: () => saveFileAs(win) },
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
  },
};
