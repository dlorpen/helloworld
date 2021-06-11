const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const { readFile, writeFile } = require("fs/promises");
const path = require("path");

if (require("electron-squirrel-startup")) return app.quit();

let win = null;

function createWindow() {
  const oldWin = win;

  const pathToPreload = path.join(__dirname, "./preload.js");
  console.log(pathToPreload);

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

  win.loadFile("index.html");

  oldWin?.destroy();
}

const openFile = async () => {
  try {
    const { filePaths, canceled } = await dialog.showOpenDialog({
      properties: ["openFile"],
    });
    if (canceled) return;
    const fileText = await readFile(filePaths[0], "utf8");
    win.currentFilePath = filePaths[0];
    win.webContents.send("loadFile", fileText);
  } catch (err) {
    console.error(err);
  }
};

const saveText = async (filePath, fileText) => {
  try {
    const result = await writeFile(filePath, fileText);
    if (result !== undefined) throw new Error("File write did not succeed");
  } catch (err) {
    console.error(err);
  }
};

const saveFile = async () => {
  try {
    if (!win.currentFilePath) {
      saveFileAs();
    } else {
      console.log(`Saving to file: ${win.currentFilePath}`);
      ipcMain.once("fileContents", (event, args) =>
        saveText(args[0].filePath, args[0].fileText)
      );
      win.webContents.send("saveFile", win.currentFilePath);
    }
  } catch (err) {
    console.error(err);
  }
};

const saveFileAs = async () => {
  try {
    const { filePath, canceled } = await dialog.showSaveDialog({
      properties: ["createDirectory"],
    });
    if (canceled) return;
    win.currentFilePath = filePath;
    saveFile();
  } catch (err) {
    console.error(err);
  }
};

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
