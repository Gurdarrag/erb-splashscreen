/* eslint global-require: off, no-console: off, promise/always-return: off */

import { app, ipcMain } from 'electron';
import { delay } from 'electron-notarize/lib/helpers';
import AppUpdater from './AppUpdater';
import MainWindow from '../window/MainWindow';
import SplashWindow from '../window/SplashWindow';
import { AppOptions } from './AppOptions';

export default class App {
  electronApp: Electron.App;

  splashWindow: SplashWindow | null = null;

  mainWindow: MainWindow | null = null;

  private readonly options: AppOptions;

  constructor(options: AppOptions) {
    this.electronApp = app;
    this.options = options;
    this.addAppListeners();
    this.addIPCListener();
  }

  private addAppListeners = () => {
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
        this.createSplashWindow();
        this.electronApp.on('activate', () => {
          // On macOS, it's common to re-create a window in the app when the
          // dock icon is clicked and there are no other windows open.
          if (this.splashWindow === null) this.createSplashWindow();
        });
      })
      .catch(console.log);
  };

  private addIPCListener = () => {
    ipcMain.on('ipc-example', async (event, arg) => {
      const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
      console.log(msgTemplate(arg));
      event.reply('ipc-example', msgTemplate('pong'));
    });
  };

  private createSplashWindow = async () => {
    if (!this.splashWindow) {
      this.splashWindow = new SplashWindow(this.options);
      await this.splashWindow.init();
      // Remove this if your app does not use auto updates
      // eslint-disable-next-line
      new AppUpdater();
    }
    this.splashWindow.render();
    await delay(5000);
    this.createMainWindow();
  };

  private createMainWindow = async () => {
    if (!this.mainWindow) {
      this.mainWindow = new MainWindow(this.options);
      await this.mainWindow.init();
    }
    this.mainWindow.render();
  };
}
