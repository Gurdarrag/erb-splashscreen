import path from 'path';
import { BrowserWindow, app } from 'electron';
import { EventEmitter } from 'events';
import { AppOptions } from '../core/AppOptions';

export default abstract class AbstractWindow extends EventEmitter {
  electronApp: Electron.App;

  protected readonly isDebug: boolean = false;

  protected options: AppOptions;

  protected window: BrowserWindow | undefined;

  constructor(options: AppOptions) {
    super();
    this.electronApp = app;
    this.options = options;
    this.isDebug = options.isDebug ?? false;
  }

  public async init() {
    if (this.isDebug) {
      await this.installExtensions();
    }
  }

  public abstract render(): void;

  protected abstract registerListeners(): void;

  protected installExtensions = async () => {
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

  protected getAssetPath = (...paths: string[]): string => {
    return path.join(this.options.resourcesPath, ...paths);
  };
}
