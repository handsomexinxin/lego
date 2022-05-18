module.exports = {
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "sass",
            patterns: []
        }
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://local.test:7001",
                changeOrigin: true,

            }
        }
    }

};
