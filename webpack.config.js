const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { write } = require('fs');


module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    open: true,
    // watchFiles: ["src/*.html"],
    hot: false,
    port: 9000,
    devMiddleware: {
      writeToDisk: true,
  },
},

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [
          
           
          {loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
           'css-loader'],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
      },
    },
      
    ],
},
  plugins: [
    new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
  }),

  new MiniCssExtractPlugin({
    filename: 'css/style.css',
  }),

  new CssMinimizerPlugin(),

],
};