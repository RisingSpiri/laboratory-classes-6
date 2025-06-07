const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, 
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    console.log('Electron window opened successfully');
  });

  mainWindow.loadURL('http://localhost:3000');
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startServer() {
  console.log('Starting Express server...');
  serverProcess = spawn('npm', ['start'], { 
    stdio: 'inherit',
    shell: true 
  });
  
  
  setTimeout(() => {
    createWindow();
  }, 3000);
}

app.on('ready', () => {
  startServer();
});

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
