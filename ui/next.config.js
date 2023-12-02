const p = require('./package.json')
const optimizedImages = require('next-optimized-images')
const withPlugins = require('next-compose-plugins')

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
const version = p.version;

module.exports = withPlugins([
  optimizedImages({

  }),
  {
    images: {
      disableStaticImages: true,
    },
    poweredByHeader: true,
    productionBrowserSourceMaps: true,
    publicRuntimeConfig: {
      environment,
      endpoint: process.env.ENDPOINT || '/graphql',
      spa: !!process.env.SPA || false,
      mainBackground: process.env.MAIN_BACKGROUND || '#8FA2A6'
    },
    serverRuntimeConfig: {
      endpoint: process.env.SERVER_ENDPOINT || process.env.ENDPOINT || '/graphql',
    },
    env: {
      version,
    }
  }
])
