import { delay } from 'electron-notarize/lib/helpers';
import ConfiguratorStep from './ConfiguratorStep';

export default class Delayer extends ConfiguratorStep {
  private readonly delayTime: number;

  private interval: NodeJS.Timer | undefined;

  private elapsedTime: number = 0;

  constructor(delayTime?: number) {
    super();
    this.delayTime = delayTime ?? 5000;
  }

  init = (): Promise<boolean> => Promise.resolve(true);

  run = async (): Promise<boolean> => {
    this.interval = setInterval(this.getProgress, 1000);
    await delay(this.delayTime);
    clearInterval(this.interval);
    return Promise.resolve(true);
  };

  getProgress = () => {
    this.elapsedTime += 1000;
    this.emit('progress', (this.elapsedTime / this.delayTime) * 100);
  };
}
