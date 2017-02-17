'use strict';

const webpack = require('webpack');

module.exports = {
    target: 'web',
    cache: true,
    entry: {
        css: ['./node_modules/todomvc-app-css/index.css'],
        common: ['classnames', 'director', 'immutable', 'reselect', 'isomorphic-fetch',
            'react', 'react-dom', 'redux', 'react-redux', 'redux-immutable', 'redux-thunk'],
        client: './src/client.js'
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    },
    output: {
        path: `${__dirname}/javascripts`,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"'
        // }),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
    ]
};
