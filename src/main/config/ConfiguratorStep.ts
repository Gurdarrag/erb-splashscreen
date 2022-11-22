import { EventEmitter } from 'events';

export default abstract class ConfiguratorStep extends EventEmitter {
  abstract init(): Promise<boolean>;
  abstract run(): Promise<boolean>;
}
