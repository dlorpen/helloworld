const { ipcRenderer, contextBridge } = require("electron");

const sendRendererMessage = (channel, message) => {
  ipcRenderer.send(channel, message);
};

const addRendererListener = (channel, listener) => {
  ipcRenderer.on(channel, (event, args) => listener(event, args));
};

contextBridge.exposeInMainWorld("sendRendererMessage", sendRendererMessage);
contextBridge.exposeInMainWorld("addRendererListener", addRendererListener);
