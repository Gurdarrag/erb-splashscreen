export default abstract class ConfiguratorStep {
  abstract init(): Promise<boolean>;
  abstract run(): Promise<boolean>;
}
