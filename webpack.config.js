var webpack = require('webpack');
var bowerWebpackPlugin = require("bower-webpack-plugin");
var bower = new bowerWebpackPlugin({
    modulesDirectories: ["../bower_components"],
    manifestFiles:      "bower.json"
});

var jquery = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: "jquery"
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
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style!css!less?strictMath&noIeCompat&limit=100000"
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
                loaders: ['babel-loader']
            }
        ]
    },
    plugins: [bower, jquery]
};
