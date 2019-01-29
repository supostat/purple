const webpack = require('webpack');
const path = require('path');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new FriendlyErrorsWebpackPlugin({
    clearConsole: true,
  }),
  new webpack.HashedModuleIdsPlugin(),
  new HtmlWebpackPlugin({
    // Required
    inject: false,
    template: require('html-webpack-template'),

    // Optional
    title: 'Purple App',
    appMountId: 'app',
    meta: [
      {
        name: 'description',
        content: 'A better default template for html-webpack-plugin.',
      },
    ],
    // And any other config options from html-webpack-plugin:
    // https://github.com/ampedandwired/html-webpack-plugin#configuration
  }),
];

module.exports = (env, dotenvs = {}) => {
  const envKeys = dotenvs
    ? Object.keys(dotenvs).reduce(
        (prev, next) => ({
          ...prev,
          [`process.env.${next}`]: JSON.stringify(dotenvs[next]),
        }),
        {},
      )
    : {};
  plugins.push(new webpack.DefinePlugin(envKeys));

  if (env && env.analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    optimization: {
      runtimeChunk: { name: 'runtime' },
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'vendors',
          },
          assets: {
            test: /([\\/]assets[\\/])|(\.sass$)/,
            chunks: 'all',
            name: 'assets',
          },
        },
      },
    },

    bail: true,
    watch: false,
    mode: 'none',
    devtool: false,

    entry: {
      main: path.resolve('src/index.js'),
    },
    output: {
      path: path.join(__dirname, '/public'),
      filename: 'frontend_bundle-[hash:50].js',
      chunkFilename: 'frontend_chunk-[name]-[chunkhash:50].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.svg$/,
          loader: 'url-loader',
          options: {
            mimetype: 'image/svg+xml',
            limit: 30000,
          },
        },
        {
          test: /\.gif$/,
          loader: 'url-loader',
          options: {
            mimetype: 'image/gif',
            limit: 300000,
          },
        },
        {
          test: /\.png$/,
          loader: 'url-loader',
          options: {
            mimetype: 'image/png',
            limit: 30000,
          },
        },
        {
          test: /\.gif$/,
          loader: 'url-loader',
          options: {
            mimetype: 'image/gif',
            limit: 30000,
          },
        },
        {
          test: /\.(woff|woff2)$/,
          loader: 'url-loader',
          options: {
            mimetype: 'application/font-woff',
            limit: 300000,
          },
        },
        {
          test: /\.eot$/,
          loader: 'url-loader',
          options: {
            mimetype: 'application/vnd.ms-fontobject',
            limit: 300000,
          },
        },
        {
          test: /\.(ttf|otf)$/,
          loader: 'url-loader',
          options: {
            mimetype: 'application/octet-stream',
            limit: 300000,
          },
        },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.sass$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.js.jsx', '.ts', '.tsx'],
      modules: [path.resolve('node_modules')],
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
    plugins,
  };
};
