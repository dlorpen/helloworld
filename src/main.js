const { openFile, saveFile, saveFileAs, showHelpAbout } = require("./dialogFunctions");
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) return app.quit();

let win = null;

function createWindow() {
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
}

app.whenReady().then(() => {
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

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
