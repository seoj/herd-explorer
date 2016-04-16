require('es6-promise').polyfill();
var webpack = require('webpack');
var path = require('path');

var plugins = [ new webpack.optimize.DedupePlugin(), new webpack.optimize.OccurrenceOrderPlugin() ];

//plugins.push(new webpack.optimize.UglifyJsPlugin({
//    mangle : false,
//    compress : {
//        warnings : false
//    }
//}));

module.exports = {
    entry : path.resolve(__dirname, 'app', 'entry.js'),
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : 'bundle.js'
    },
    plugins : plugins,
    module : {
        loaders : [ {
            test : /\.css$/,
            loader : 'style!css'
        }, {
            test : /\.html$/,
            loader : 'raw!html-minify'
        } ]
    }
};