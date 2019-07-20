const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/js/1.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bound.min.js'
    },
    module: {
        rules: [ //rules     是数组！
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            // {
            //     test: /\.(png|jpg|gif)$/i,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             outputPath: 'images/'
            //         }
            //     }
            // },
            {
                test: /\.(png|jpg|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        limit: 500 * 1024
                    }
                }
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/, //配置在最外一级
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] //数组   preset's'
                    }

                }
            },

        ]
    },
    devtool: 'source-map'
};