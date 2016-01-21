var webpack = require('webpack');
var path    = require('path');

module.exports = function (PATH, PORT) {
    return {
        entry:     [
            // Set developer server to server static
            `webpack-dev-server/client?http://localhost:` + PORT,
            'webpack/hot/only-dev-server',
            // Set up an ES6-ish environment
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
                test:    /\.json/,
                loaders: ['json']
            }, {
                test:   /\.less/,
                loader: 'style!css!autoprefixer!less'
            }, {
                test:    /\.svg/,
                loaders: [
                    'file-loader',
                    'svgo-loader?useConfig=svgo'
                ]
            }, {
                test:   /\.(eot|woff|woff2|ttf|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
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
        ],
        svgo:      {
            plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false}
            ]
        }
    }
};
