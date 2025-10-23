const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
};

// app.on is not used as whenReady is preferred acc to elec docs due to some fallback (gotta read)
app.whenReady().then(() => {
  createWindow();
});

// this is to check if the window is closed if it is clsoe the app too
app.on("window-all-closed", () => {
  if (process.platform != "darwin") app.quit();
});
