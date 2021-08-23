const path = require('path');
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: path.resolve(__dirname, './'),
        aliases: {
          '@': './src',
          '@components': './src/components',
          '@containers': './src/containers',
          '@hooks': './src/hooks',
          '@images': './src/images',
          '@pages': './src/pages',
          '@routes': './src/routes',
          '@services': './src/services',
          '@store': './src/store',
          '@styles': './src/styles',
          '@utils': './src/utils'
        }
      }
    }
  ]
};
