const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = (app)=>{
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://maps.googleapis.com',
            changeOrigin: true,
            pathRewrite:{
                '^/api': '',
            },
        })
    );
};

// https://sunkanmi.tech/how-to-setup-proxy-in-react-with-http-proxy-middleware