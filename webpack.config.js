const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin  = require('optimize-css-assets-webpack-plugin')

const DEV = process.env.NODE_ENV !== 'production';

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src/index.html'),
  filename: 'index.html',
  favicon: 'assets/img/favicon.ico',
})

const miniCssPlugin = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: DEV ? '[name].css' : '[name].[hash].css',
  chunkFilename: DEV ? '[id].css' : '[id].[hash].css',
})

module.exports = {
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'assets'),
    }
  },
  optimization: {
    minimize: true,
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !DEV,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader'
          },
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin, miniCssPlugin]
};
