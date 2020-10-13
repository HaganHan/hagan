const webpackCommonConfig = require('./webpack.common.js')
const webpackMerge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = webpackMerge(webpackCommonConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // 使编译后的文件在没必要改变chunkHash时尽量不改变chunkHash以使缓存生效
    new webpack.HashedModuleIdsPlugin()
  ]
})
