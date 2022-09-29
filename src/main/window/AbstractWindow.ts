import path from 'path';
import { BrowserWindow, app } from 'electron';
import { AppOptions } from '../core/AppOptions';

export default abstract class AbstractWindow {
  electronApp: Electron.App;

  protected readonly isDebug: boolean = false;

  protected options: AppOptions;

  protected window: BrowserWindow | undefined;

  constructor(options: AppOptions) {
    this.electronApp = app;
    this.options = options;
    this.isDebug = options.isDebug ?? false;
  }

  init = async () => {
    if (this.isDebug) {
      await this.installExtensions();
    }
  };

  abstract render(): void;

  installExtensions = async () => {
    // eslint-disable-next-line global-require
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return (
      installer
        .default(
          extensions.map((name) => installer[name]),
          forceDownload
        )
        // eslint-disable-next-line no-console
        .catch(console.log)
    );
  };

  getAssetPath = (...paths: string[]): string => {
    return path.join(this.options.resourcesPath, ...paths);
  };
}
