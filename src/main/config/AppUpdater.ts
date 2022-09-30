import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import ConfiguratorStep from './ConfiguratorStep';

export default class AppUpdater implements ConfiguratorStep {
  init = (): Promise<boolean> => {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    return Promise.resolve(true);
  };

  run = (): Promise<boolean> => {
    autoUpdater.checkForUpdatesAndNotify();
    return Promise.resolve(true);
  };
}
