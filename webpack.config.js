var BowerWebpackPlugin = require("bower-webpack-plugin");

var bower = new BowerWebpackPlugin({
    modulesDirectories: ["../bower_components"],
    manifestFiles:      "bower.json"
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
            { test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [bower]
}
