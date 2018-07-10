const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      { test: /\.vue$/, use: [ 'vue-loader' ] }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: { 
      'vue$': 'vue/dist/vue.esm.js',
      'vuex$': 'vuex/dist/vuex.esm.js'
    }
  },
  serve: {
    content: './public',
    open: true
  },
  mode: 'development',
  devtool: 'source-map'
};