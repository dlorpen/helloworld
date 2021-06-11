const textArea = document.querySelector("#userText");

window.addRendererListener("loadFile", (event, args) => {
  textArea.value = args;
});

window.addRendererListener("saveFile", (event, args) => {
    const result = [{ filePath: args, fileText: textArea.value}];
    window.sendRendererMessage("fileContents", result);
});
