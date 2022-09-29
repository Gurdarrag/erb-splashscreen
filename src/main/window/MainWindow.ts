import { BrowserWindow, shell } from 'electron';
import path from 'path';
import AbstractWindow from './AbstractWindow';
import { resolveHtmlPath } from '../util';
import MenuBuilder from '../menu';

export default class MainWindow extends AbstractWindow {
  render(): void {
    this.window = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
      icon: this.getAssetPath('icon.png'),
      webPreferences: {
        preload: this.electronApp.isPackaged
          ? path.join(__dirname, '../preload.js')
          : path.join(__dirname, '../../../.erb/dll/preload.js'),
      },
    });
    this.window.loadURL(resolveHtmlPath('main.html'));

    this.window.on('ready-to-show', () => {
      if (!this.window) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        this.window.minimize();
      } else {
        this.window.show();
      }
    });

    this.window.on('closed', () => {
      this.window = undefined;
    });

    const menuBuilder = new MenuBuilder(this.window);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    this.window.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });
  }

  protected registerListeners = (): void => {};
}
