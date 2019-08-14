const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopywebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const cesiumThirdParty = '../Build/Cesium/ThirdParty';

module.exports = {
    mode: 'production', // default
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),

        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    node: {
        // Resolve node module use of fs
        fs: 'empty'
    },
    resolve: {
        alias: {
            // CesiumJS module name
            cesium: path.resolve(__dirname, cesiumSource)
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: ['url-loader']
        },
        {
            // Strip cesium pragmas
            test: /\.js$/,
            enforce: 'pre',
            include: path.resolve(__dirname, cesiumSource),
            use: [{
                loader: 'strip-pragma-loader',
                options: {
                    pragmas: {
                        debug: false
                    }
                }
            }]
        }

        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopywebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
        new CopywebpackPlugin([{ from: path.join(cesiumSource, cesiumThirdParty), to: 'ThirdParty' }]),
        new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
        new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        }),
        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'cesium',
            minChunks: module => module.context && module.context.indexOf('cesium') !== -1
        }),
        new webpack.optimize.UglifyJsPlugin()*/
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist")
    },
    //devtool: 'eval',
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    //test: /[\\/]node_modules[\\/](cesium)[\\/]/, //for specific module separation ref: https://webpack.js.org/plugins/split-chunks-plugin/
                    test: /[\\/]node_modules[\\/]/,         //for all used node modules
                    name: 'dependencies',
                    chunks: 'all',
                  }
            }
        }
    }
};