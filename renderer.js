const textArea = document.querySelector("#userText");
textArea.value = "Loaded script";

console.log(window.addRendererListener);

window.addRendererListener("loadFile", (event, args) => {
  textArea.value = args;
  console.log(event);
  console.log(args);
});
