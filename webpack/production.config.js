const dotenv = require('dotenv');

const getConfig = require('../webpack.config');

module.exports = env => {
  const dotenvs = dotenv.config({ path: '.env.production' }).parsed;
  const config = getConfig(env, dotenvs);

  config.mode = 'none';
  config.devtool = 'source-map';
  config.optimization.usedExports = true;
  config.optimization.concatenateModules = true;
  config.optimization.noEmitOnErrors = true;
  config.optimization.nodeEnv = 'production';
  config.optimization.minimize = true;

  return config;
};
