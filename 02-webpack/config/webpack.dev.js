const common = require("./webpack.common");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const {devServerPath,output} = require("./path");
const { merge } = require('webpack-merge')
const smp = new SpeedMeasurePlugin();
const devConfig = smp.wrap({
  mode: 'development',
  output:{
    path:output,
    filename:'[name].bundle.js',
    clean: true// 编译前清除输出的目录
  },
})
module.exports = merge(common,devConfig);