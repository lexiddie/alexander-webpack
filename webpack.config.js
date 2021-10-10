const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
console.log(`Checking App Directory`, appDirectory);
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const joinApp = (relativePath) => path.join(appDirectory, relativePath);

console.log(`Checking ResolveApp`, resolveApp('public/index.html'));
console.log(`Checking JoinApp`, joinApp('public/index.html'));

module.exports = {
  entry: path.join(__dirname, 'src/', 'index.js'),
  // entry: path.resolve(__dirname, 'src/index.js'),
  // entry: resolveApp('src/index.js'),
  output: {
    path: resolveApp('dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        // Select file styles extension with CSS or Sass or Scss
        test: /\.(css|sass|scss)$/,
        use: [
          // Translates CSS into CommonJS
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          {
            // Compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: resolveApp('public/index.html')
    })
  ]
};
