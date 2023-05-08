const glob = require('glob')
const common = require("./webpack.common");
const { merge } = require('webpack-merge')
const {output,rootPath} = require("./path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const prodConfig = {
  mode: 'production',
  output:{
    path:output,
    filename:'[name].[hash].bundle.js',
    clean: true// 编译前清除输出的目录
  },
  
  plugins:[
    new BundleAnalyzerPlugin(),
    new PurgeCSSPlugin({//css tree-shaking
      paths: glob.sync(`${rootPath}/**/*`,  { nodir: true }),
    }),
    new MomentLocalesPlugin({//momnet删除无用的语言包
      localesToKeep: ['zh-cn'],
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),//css代码压缩,js代码压缩默认会在生产环境开启
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
    // splitChunks: {
    //   // include all types of chunks
    //   chunks: 'all',
    //   // 重复打包问题
    //   cacheGroups:{
    //     vendors:{ // node_modules里的代码
    //       test: /[\\/]node_modules[\\/]/,
    //       chunks: "all",
    //       // name: 'vendors', 一定不要定义固定的name
    //       priority: 10, // 优先级
    //       enforce: true 
    //     }
    //   }
    // },
  },
}
module.exports = merge(common,prodConfig);