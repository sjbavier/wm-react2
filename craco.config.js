const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1DA57A',
              // '@body-background': '#1b1e2b',
              // '@component-background': '#1b1e2b'
              '@body-background': 'transparent',
              '@component-background': 'transparent'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
