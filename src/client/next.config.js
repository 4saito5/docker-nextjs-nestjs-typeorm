const TerserPlugin = require('terser-webpack-plugin');
const isMinimize = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'development';
const isDisabledConsoleOutput = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';

module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.optimization.minimize = isMinimize;
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: isDisabledConsoleOutput,
          },
          output: {
            comments: false,
            beautify: false
          }
        },
        extractComments: 'all',
      }),
    ];
    return config;
  },
};
