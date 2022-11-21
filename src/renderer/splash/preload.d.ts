import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        sendMessage(channel: Channels, args: any[]): void;
        on(
          channel: Channels,
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          func: (...args: any[]) => void
        ): (() => void) | undefined;
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        once(channel: Channels, func: (...args: any[]) => void): void;
      };
    };
  }
}

export {};
