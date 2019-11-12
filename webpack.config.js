const path = require('path');
const webpack = require('webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
require('dotenv').config();

module.exports = smp.wrap({
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)&/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*']
    },
    devServer: {
        clientLogLevel: 'silent',
        disableHostCheck: true,
        contentBase: path.join(__dirname, 'public'),
        compress: false,
        inline: true,
        hot: true,
        liveReload: false,
        watchContentBase: false,
        overlay: {
            errors: true
        },
        port: 3000
    }
})
