var webpack = require('webpack');
var path    = require('path');

module.exports = function (PATH, PORT) {
    return {
        entry:     [
            // Set developer server to server static
            `webpack-dev-server/client?http://localhost:` + PORT,
            'webpack/hot/only-dev-server',
            // Set up an ES6-ish environment with core-js
            'babel-polyfill',
            // Add our application's script below
            './src/styles/main.less',
            './src/js/index.jsx'
        ],
        module:    {
            loaders: [{
                test:    /\.jsx?$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            }, {
                test:   /\.less/,
                loader: 'style!css!autoprefixer!less'
            }]
        },
        output:    {
            path:       path.join(__dirname, PATH, 'js'),
            publicPath: '/',
            filename:   'bundle.js'
        },
        devtool:   'source-map',
        devServer: {
            contentBase: path.join(__dirname, PATH),
        },
        plugins:   [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development'),
                }
            })
        ]
    }
};
