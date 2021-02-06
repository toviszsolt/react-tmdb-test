// eslint-disable-next-line import/no-extraneous-dependencies
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://tmdb.apps.quintero.io/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
