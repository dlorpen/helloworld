const { app, BrowserWindow, Menu } = require("electron");

if (require("electron-squirrel-startup")) return app.quit();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  const isMac = process.platform === "darwin";
  const template = [
    {
      label: "&File",
      submenu: [isMac ? { role: "close" } : { role: "quit" }],
    },
    {
      label: "&Help",
      submenu: [
        {
          label: "About",
          click: async () => {
            const { dialog } = require("electron");
            dialog.showMessageBox(null, {
              message: "HelloWorld",
              type: "info",
              buttons: ["OK"],
            });
          },
        },
      ],
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
