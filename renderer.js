const textArea = document.querySelector("#userText");
textArea.value = "Loaded script";

window.addRendererListener("loadFile", (event, args) => {
  textArea.value = args;
});

window.addRendererListener("saveFile", (event, args) => {
    console.log(args);
    const result = [{ filePath: args, fileText: textArea.value}];
    console.log(result);
    window.sendRendererMessage("fileContents",
			       result);
});
