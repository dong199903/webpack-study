const HtmlWebpackPlugin = require('html-webpack-plugin');
const {templateHtml,input,rootPath} = require("./path");
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');
const commonConfig = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias:{
      '@':rootPath, // @ 代表 src 路径
    }
  },
  entry:input,
  externals: {//将jQuery通过cdn引入，不会打包到bundle文件中
    jquerys: 'jQuery',
  },
  cache: {
    type: 'filesystem', // 使用文件缓存,提高webpack第二次之后构建速度
  },
  plugins:[
    //自动创建html，并且导入打包的js文件
    new HtmlWebpackPlugin({
      //以当前目录下的index.html为模板
      template:templateHtml,
      //在body标签中生成script标签
      inject:'body',
      //文件名
      filename: '[name].html'
    }),
    new ProgressBarWebpackPlugin(),//进度条分析
    new MiniCssExtractPlugin({//css代码分离
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  module:{//loader的处理
    rules:[
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: rootPath,
        type: "asset/resource",
        parser:{
          dataUrlCondition:{
            maxSize: 5 * 1024//<4kb的图片打包成base64编码嵌入页面
          }
        },
        generator:{
          filename:"img/[name].[hash].[ext]"
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        include: rootPath,
      }, 
    ]
  },
}
module.exports = commonConfig;