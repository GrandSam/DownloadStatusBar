const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        background: './src/background.ts',
        content: './src/content.ts',
        options: './src/options.ts',
        confirmation: './src/confirmation.ts',
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        sass: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {url: false}
                                },
                                'sass-loader'
                            ],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    performance: {
        hints: false
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
        }),
        new CopyWebpackPlugin([
            {from: 'manifest.json', to: './'},
            {from: '.web-extension-id', to: './'},
            {from: 'src/options.html', to: './'},
            {from: 'src/confirmation.html', to: './'},
            {from: 'icons', to: './icons'},
            {from: 'icomoon/fonts', to: './fonts'},
            {from: 'sounds', to: './sounds'},
            {from: '_locales', to: './_locales'}
        ]),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};