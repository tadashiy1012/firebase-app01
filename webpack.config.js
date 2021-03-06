const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = (env, argv) => {
  argv = argv === void 0 ? {} : argv;
  const IS_DEV = argv.mode === 'development' || argv.mode === void 0;
  return {
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, IS_DEV ? 'public' : 'dist')
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
    mode: IS_DEV ? 'development' : 'production',
    devtool: IS_DEV ? 'source-map' : 'none',
    optimization: {
      minimize: true,
    }
  };
};