/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { app as electronApp } from 'electron';
import path from 'path';
import App from './core/App';

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}
const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const resourcesPath = electronApp.isPackaged
  ? path.join(process.resourcesPath, '../assets')
  : path.join(__dirname, '../../../assets');

const app = new App({ isDebug, resourcesPath });
app.on('ready', async () => {
  await app.start();
});
