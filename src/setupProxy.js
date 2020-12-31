const { createProxyMiddleware } = require( 'http-proxy-middleware' );

module.exports = function( app ) {
    app.use(
        '/api',
        createProxyMiddleware( {
            target: 'https://tmdb.apps.quintero.io/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            },
        } )
    );
};
