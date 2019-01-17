const getConfig = require('./../webpack.config');

module.exports = env => {
  const config = getConfig(env);

  config.mode = 'development';
  config.devtool = 'source-map';
  config.optimization.nodeEnv = 'development';
  config.devServer = {
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: true,
    },
  };
  return config;
};
