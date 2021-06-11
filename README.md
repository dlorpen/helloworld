# Hello World

This was supposed to be a Hello World electron app - just following the tutorial at [electronjs.org](https://www.electronjs.org/docs/latest/get-started/quick-start) but... it grew to be a tiny bit more than that.

This app now demonstrates:

- Creating a basic electron app with main, renderer and preload scripts
- Interacting with the file system
  - Displaying native file dialogs
  - Reading from and writing to text files
- Interprocess Communication between main and renderer process
- Building cross platform installers using electron forge

There are some bits that don't seem to quite work, for example I tried to run the Windows app through Wine and it just bombed completely, but I'm hopeful that it might run on actual Windows.

Also I did add an icon to the electron forge config buuut... I'm pretty sure it doesn't really work.
