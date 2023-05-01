const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode:'development',
  entry:'./src/index.tsx',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].[contenthash].bundle.js',
    clean: true// 编译前清除输出的目录
  },
  module:{//loader的处理
    rules:[
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // include: "/src",
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        // include: paths.appSrc,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015',
            },
          }
        ]
      },
    ]
  },
  plugins:[
    //自动创建html，并且导入打包的js文件
    new HtmlWebpackPlugin({
      //以当前目录下的index.html为模板
      template:'./public/index.html',
      //在body标签中生成script标签
      inject:'body',
      //文件名
      filename: '[name].html'
    }) 
  ],
  /**
   * 代码映射：只在开发环境下开启
   */
  devtool:"eval-cheap-module-source-map",

  /**
   * 代码热更新
   */
  devServer:{
    static:{
      directory:path.resolve(__dirname,"./dist")
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}