import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'development', // process.env.NODE_ENV
  entry: './client/index.tsx',
  devtool: 'inline-source-map',
  // target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          // 'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    // contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 8080,
    proxy: {
      '/': 'http://localhost:3000',
      '/schema': 'http://localhost:3000',
    },
    historyApiFallback: true,
    // hot: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'development',
      template: './index.html',
    })],

};

export default config;