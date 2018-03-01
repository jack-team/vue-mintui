/**
 * Created by jiangtao on 16/7/5.
 */

const webpack = require('webpack');

const AssetsPlugin = require('assets-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./base.config');

const prodConfig = {
    plugins:[
        new webpack.optimize.OccurrenceOrderPlugin(true),
        //js压缩参数
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            beautify:false,
            comments:false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            __DEV__: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new AssetsPlugin({
            filename:"asset.json",
            processOutput:function ( assets ) {
                const { common , app } = assets;
                const assetsMap = {
                    css:[common.css,app.css],
                    js:[common.js,app.js]
                };
                return JSON.stringify(assetsMap);
            }
        }),
        new CleanWebpackPlugin("../dist", {
            root: __dirname,       　　　　　　　　　　
            verbose: true,        　　　　　　　　　
            dry:false
        })
    ]
};

baseConfig.output.publicPath = "/static/";

baseConfig.plugins = prodConfig.plugins.concat( baseConfig.plugins );

module.exports = baseConfig;