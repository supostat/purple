const dotenv = require('dotenv');
const getConfig = require('./../webpack.config');

module.exports = env => {
  const dotenvs = dotenv.config({ path: '.env.development' }).parsed;
  const envKeys = dotenvs
    ? Object.keys(dotenvs).reduce(
        (prev, next) => ({
          ...prev,
          [`process.env.${next}`]: JSON.stringify(dotenvs[next]),
        }),
        {},
      )
    : {};
  const config = getConfig(env, envKeys);

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
