import { EventEmitter } from 'events';
import ConfiguratorStep from './ConfiguratorStep';
import AppUpdater from './AppUpdater';
import Delayer from './Delayer';

export default class Configurator extends EventEmitter {
  private readonly steps: ConfiguratorStep[];

  constructor() {
    super();
    this.steps = [new Delayer(), new AppUpdater()];
  }

  public async configure() {
    // eslint-disable-next-line no-restricted-syntax
    for (const step of this.steps) {
      // eslint-disable-next-line no-await-in-loop
      await this.configureStep(step);
    }
    this.emit('finished');
  }

  private async configureStep(step: ConfiguratorStep) {
    step.on('progress', (progress) => {
      this.getProgress(step, progress);
    });
    await step.init();
    await step.run();
    this.getProgress(step);
  }

  private getProgress(step: ConfiguratorStep, stepProgress = 100): void {
    const basePercentage = (1 / this.steps.length) * 100;
    const stepPercentage = (basePercentage / 100) * (stepProgress / 100) * 100;
    const percent =
      (this.steps.indexOf(step) / this.steps.length) * 100 + stepPercentage;
    this.emit('progress', percent);
  }
}
