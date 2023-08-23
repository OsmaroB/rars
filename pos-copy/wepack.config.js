const CopyPlugin = require('copy-webpack-plugin');

new CopyPlugin({
    patterns: [
      { from: 'public/manifest.json', to: '' },
      { from: 'public/service-worker.js', to: '' },
      { from: 'public/icon.png', to: 'assets' },
    ],
})