const oFetch = require('o-fetch');

const getConfig = require('../webpack.config');

module.exports = env => {
  const BASE_API_URL = oFetch(process.env, 'BASE_API_URL');
  const ADMIN_EMAIL = oFetch(process.env, 'ADMIN_EMAIL');
  const config = getConfig(env, {
    [`process.env.BASE_API_URL`]: JSON.stringify(BASE_API_URL),
    [`process.env.ADMIN_EMAIL`]: JSON.stringify(ADMIN_EMAIL),
  });

  config.mode = 'none';
  config.devtool = 'source-map';
  config.optimization.usedExports = true;
  config.optimization.concatenateModules = true;
  config.optimization.noEmitOnErrors = true;
  config.optimization.nodeEnv = 'production';
  config.optimization.minimize = true;

  return config;
};
