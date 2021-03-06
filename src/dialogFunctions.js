const { readFile, writeFile } = require("fs/promises");
const { dialog, ipcMain } = require("electron");

const saveText = async (filePath, fileText) => {
  try {
    const result = await writeFile(filePath, fileText);
    if (result !== undefined) throw new Error("File write did not succeed");
  } catch (err) {
    console.error(err);
  }
};

const openFile = async (win) => {
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

const saveFile = async (win) => {
  try {
    if (!win.currentFilePath) {
      saveFileAs(win);
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

const saveFileAs = async (win) => {
  try {
    const { filePath, canceled } = await dialog.showSaveDialog({
      properties: ["createDirectory"],
    });
    if (canceled) return;
    win.currentFilePath = filePath;
    saveFile(win);
  } catch (err) {
    console.error(err);
  }
};

const showHelpAbout = async () => {
  dialog.showMessageBox(null, {
    message: "HelloWorld",
    type: "info",
    buttons: ["OK"],
  });
};

module.exports = { openFile, saveFile, saveFileAs, showHelpAbout };
