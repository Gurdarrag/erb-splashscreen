import { delay } from 'electron-notarize/lib/helpers';
import ConfiguratorStep from './ConfiguratorStep';

export default class Delayer extends ConfiguratorStep {
  private readonly delayTime: number;

  constructor(delayTime?: number) {
    super();
    this.delayTime = delayTime ?? 5000;
  }

  init = (): Promise<boolean> => Promise.resolve(true);

  run = async (): Promise<boolean> => {
    await delay(this.delayTime);
    return Promise.resolve(true);
  };
}
