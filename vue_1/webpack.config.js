const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/vm.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bound.min.js'
    },
    modules: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }]
    }
}