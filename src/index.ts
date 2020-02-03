import { app, screen, BrowserWindow } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

var controllerWindow;
var contentWindow;

app.on('ready', function() {
  var electronScreen = screen;
  var displays = electronScreen.getAllDisplays();
  var externalDisplay = null;
  for (var i in displays) {
    if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
      externalDisplay = displays[i];
      break;
    }
  }

  if (externalDisplay) {
    controllerWindow = new BrowserWindow({
      kiosk: true,
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y
    });

    controllerWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  }

  contentWindow = new BrowserWindow({
    kiosk: true,
  });
  contentWindow.loadURL("https://google.com")
});