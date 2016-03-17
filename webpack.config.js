var webpack = require('webpack');
var bowerWebpackPlugin = require("bower-webpack-plugin");
var bower = new bowerWebpackPlugin({
    modulesDirectories: [__dirname + "/bower_components"],
    manifestFiles: "bower.json"
});

var jquery = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: "jquery",
    "window.Tether": 'tether'
});

module.exports = {
    entry: {
        vendors: './src/Gitcolab/Bundle/AppBundle/Resources/assets/js/vendor.js',
        app: './src/Gitcolab/Bundle/AppBundle/Resources/assets/js/app.js'
    },
    output: {
        filename: 'bundle.js',
        path: 'web/js/',
        publicPath: '/assets'
    },
    resolve: {
        alias: {
            'selectize': 'bower_components/selectize/dist/js/selectize.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: 'imports?jQuery=jquery&Tether=Tether'
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader']
            }
        ]
    },
    plugins: [bower, jquery]
};
