import env, { Environment } from '../common/config/interface/env';

class ServiceTypes {
  public environment: Environment;
  public BASE_URL: string;

  constructor() {
    this.environment = env.environment as Environment;
    this.BASE_URL = this.environment === Environment.Develop ? env.developAPI : env.productionAPI;
  }

  public setEnvironment(environment: Environment) {
    this.environment = environment;
  }
}

export default new ServiceTypes();
