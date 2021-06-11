const { createMenu, createWindow } = require("./windowFunctions");
const { app, BrowserWindow } = require("electron");

if (require("electron-squirrel-startup")) return app.quit();

app.whenReady().then(() => {
  createMenu();
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
