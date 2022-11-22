import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example' | 'window:splash';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    sendMessage(channel: Channels, args: any[]) {
      ipcRenderer.send(channel, args);
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    on(channel: Channels, func: (...args: any[]) => void) {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const subscription = (_event: IpcRendererEvent, ...args: any[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    once(channel: Channels, func: (...args: any[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
