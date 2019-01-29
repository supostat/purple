const dotenv = require('dotenv');
const getConfig = require('./../webpack.config');

module.exports = env => {
  const dotenvs = dotenv.config({ path: '.env.development' }).parsed;
  const config = getConfig(env, dotenvs);

  config.mode = 'development';
  config.devtool = 'source-map';
  config.optimization.nodeEnv = 'development';
  config.devServer = {
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: false,
    },
  };
  return config;
};
