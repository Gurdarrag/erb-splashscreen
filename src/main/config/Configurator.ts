import { EventEmitter } from 'events';
import ConfiguratorStep from './ConfiguratorStep';
import AppUpdater from './AppUpdater';
import Delayer from './Delayer';

export default class Configurator extends EventEmitter {
  private steps: ConfiguratorStep[];

  constructor() {
    super();
    this.steps = [new Delayer(), new AppUpdater()];
  }

  public async configure() {
    await Promise.all(
      this.steps.map(async (step) => {
        await step.init();
        await step.run();
      })
    );
    this.emit('finished');
  }
}
