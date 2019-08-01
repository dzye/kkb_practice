const path = require('path');
module.exports = function (env) {
    env = env || {};
    return {
        entry: './src/index',
        module: {
            rules: [{
                    test: /\.css$/i,
                    loader: ['vue-style-loader', 'css-loader']
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        },
        resolve: {
            alias: {
                'vue': 'vue/dist/vue.esm',
                '@': path.resolve(__dirname, 'src/components')
            }
        },
        ...env.development ? require('./config/webpack.development') : require('./config/webpack.production')
    }
}