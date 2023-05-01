const common = require("./webpack.common");
const { merge } = require('webpack-merge')
const {output} = require("./path");
const prodConfig = {
  mode: 'production',
  output:{
    path:output,
    filename:'[name].[contenthash].bundle.js',
    clean: true// 编译前清除输出的目录
  },
}
module.exports = merge(common,prodConfig);