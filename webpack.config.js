// requireで読み込むときのrootのpathを指定できる。配列で複数の指定が可能。
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  // entryオプションを解決する為のベースとなるディレクトリ
  context: __dirname + '/public',
  entry: {
    // 下の output.filename で使用されている[name]には、"public" がセットされます。
    public: './src/index'
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js',
    // publicPath は webpack-dev-server で自動コンパイルするために必要（URLにおけるJSファイルへのパスを書く）
    publicPath: 'public/dist'
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'public/src')],
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};