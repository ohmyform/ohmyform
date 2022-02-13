const p = require('./package.json')

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
const version = p.version;

module.exports = {
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
