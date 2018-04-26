const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const fs = require('fs-extra')
const Copy = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const webpackConfigProd = {
    output: {
        path: path.join(__dirname, '../dist/dev'),
        chunkFilename: '[name].[chunkhash].js',
    },
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.API_DOMAN': JSON.stringify('http://www.api-dev.baidu.com/'),
            IS_DEVELOPMETN: false
        }),
        // 提取css
        // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            async: true,
            minChunks: 3,
        }),
      /* 压缩优化代码开始*/
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        //js压缩
        new UglifyJSPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 分析代码
        // new BundleAnalyzerPlugin({ analyzerPort: 3011 }),
        // new Copy([
        //     { from: './app/assets', to: './assets' }
        // ])
    ],
}

// fs.copy('../app/images', '../dist/images')
// fs.copy('../app/iconfont', '../dist/iconfont')
module.exports = merge(webpackConfigBase, webpackConfigProd)