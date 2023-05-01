const HtmlWebpackPlugin = require('html-webpack-plugin');
const {templateHtml,input,rootPath} = require("./path");
const commonConfig = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias:{
      '@':rootPath, // @ 代表 src 路径
    }
  },
  entry:input,
  plugins:[
    //自动创建html，并且导入打包的js文件
    new HtmlWebpackPlugin({
      //以当前目录下的index.html为模板
      template:templateHtml,
      //在body标签中生成script标签
      inject:'body',
      //文件名
      filename: '[name].html'
    }) 
  ],
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
}
module.exports = commonConfig;