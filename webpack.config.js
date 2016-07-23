var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var bowerWebpackPlugin = require("bower-webpack-plugin");
var bower = new bowerWebpackPlugin({
    modulesDirectories: ["./bower_components"],
    manifestFiles:      "bower.json"
});

var jquery = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: "jquery",
    "Tether": 'tether',
    "window.Tether": "tether"
});

module.exports = {
    entry: [
        './bower_components/tether/dist/js/tether.js',
        './app/Resources/assets/js/app.js',
        './app/Resources/assets/js/team.js'
    ],
    output: {
        filename: 'bundle.js',
        path: 'web/js/',
        publicPath: '/assets'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.scss/,
                loader: "style!css!sass"
            },
            {
                test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: 'imports?jQuery=jquery'
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    plugins: [bower, jquery, new ExtractTextPlugin("bundle.css")]
};
