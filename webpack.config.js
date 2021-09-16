const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./public/js/main.js',
        // './public/js/CartComponent.js',
        // './public/js/ErrorComp.js',
        // './public/js/FilterComp.js',
        // './public/js/ProductComponent.js'
    ],
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' },
            { test: /\.css$/, use: ['style-loader', 'img-loader', 'css-loader'] }
            // { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `./public/index.html`
        }),
        new CleanWebpackPlugin
    ],
}