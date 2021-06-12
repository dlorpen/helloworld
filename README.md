# Hello World

![Image](./assets/bonjour.png)

This was supposed to be a Hello World electron app - just following the tutorial at [electronjs.org](https://www.electronjs.org/docs/latest/get-started/quick-start) but... it grew to be a tiny bit more than that.

This app now demonstrates a very basic cross platform text-editor:

- Creating a basic electron app with main, renderer and preload scripts
- Displaying an HTML GUI interface with CSS styling
- Displaying native menus
- Interacting with the file system
  - Displaying native file dialogs
  - Reading from and writing to text files
- Interprocess Communication between main and renderer process
- Building cross platform installers using [electron forge](https://www.electronforge.io/)
- Setting a proprietary licence on your code

There are some bits that don't seem to quite work, for example I tried to run the Windows app through Wine and it just bombed completely, but I'm hopeful that it might run on actual Windows.

Also I did add an icon to the electron forge config buuut... I'm pretty sure it doesn't really work.

## Building

```
  npm install
  npm run dev # will run the app in dev mode so you can play with it
  npm run make # creates installers using electron forge
```

## Cool open source software used to make this app

- Electron
- Electron Forge
- Prettier
- W3.css
- Electron Icon Maker

Ironically github sees this project as 80% CSS which is all W3.css
