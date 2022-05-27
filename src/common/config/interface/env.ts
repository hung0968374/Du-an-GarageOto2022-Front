export enum Environment {
  Production = 'production',
  Develop = 'develop',
  Test = 'test',
}

export default {
  developAPI: process.env.REACT_APP_DEVELOP_API || 'localhost',
  productionAPI: process.env.REACT_APP_PRODUCTION_API || 'localhost',
  environment: process.env.REACT_APP_ENVIRONMENT || Environment.Develop,
  captchaSiteKey: process.env.REACT_APP_GOOGLE_SITE_KEY || 'testSiteKey',
};
