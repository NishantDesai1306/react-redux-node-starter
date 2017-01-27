var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');


module.exports = {
    watch: true,
    entry: './client/index.js',
    output: {
        path: './dist',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-es2015-destructuring", "transform-object-rest-spread"]
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({template: './client/index.html'})
    ]
};