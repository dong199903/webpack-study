const common = require("./webpack.common");
const {devServerPath,output} = require("./path");
const { merge } = require('webpack-merge')
const devConfig = {
  mode: 'development',
  output:{
    path:output,
    filename:'[name].bundle.js',
    clean: true// 编译前清除输出的目录
  },
  devtool: 'eval-cheap-module-source-map',
  devServer:{
    static:{
      directory:devServerPath
    }
  },
}
module.exports = merge(common,devConfig);