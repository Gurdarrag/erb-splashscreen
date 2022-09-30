/* eslint global-require: off, no-console: off, promise/always-return: off */

import { app, ipcMain } from 'electron';
import { EventEmitter } from 'events';
import MainWindow from '../window/MainWindow';
import SplashWindow from '../window/SplashWindow';
import { AppOptions } from './AppOptions';
import Configurator from '../config/Configurator';

export default class App extends EventEmitter {
  electronApp: Electron.App;

  splashWindow: SplashWindow | null = null;

  mainWindow: MainWindow | null = null;

  private readonly options: AppOptions;

  private configurator: Configurator;

  constructor(options: AppOptions) {
    super();
    this.electronApp = app;
    this.options = options;
    this.configurator = new Configurator();
    this.registerListeners();
    this.addIPCListener();
  }

  start = async () => {
    await this.initSplashWindow();
  };

  private registerListeners = () => {
    this.electronApp.on('window-all-closed', () => {
      // Respect the OSX convention of having the application in memory even
      // after all windows have been closed
      if (process.platform !== 'darwin') {
        this.electronApp.quit();
      }
    });

    this.electronApp
      .whenReady()
      .then(() => {
        this.electronApp.on('activate', () => {
          // On macOS, it's common to re-create a window in the app when the
          // dock icon is clicked and there are no other windows open.
          if (this.splashWindow === null) this.start();
        });
      })
      .then(() => {
        this.emit('ready');
      })
      .catch(console.log);

    this.configurator.on('finished', () => {
      this.initMainWindow();
    });
  };

  private addIPCListener = () => {
    ipcMain.on('ipc-example', async (event, arg) => {
      const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
      console.log(msgTemplate(arg));
      event.reply('ipc-example', msgTemplate('pong'));
    });
  };

  private initSplashWindow = async () => {
    if (!this.splashWindow) {
      this.splashWindow = new SplashWindow(this.options);
      await this.splashWindow.init();
    }
    this.splashWindow.render();
    this.splashWindow.once('ready', () => {
      this.configurator.configure();
    });
  };

  private initMainWindow = async () => {
    if (!this.mainWindow) {
      this.mainWindow = new MainWindow(this.options);
      await this.mainWindow.init();
    }
    this.mainWindow.render();
  };
}
