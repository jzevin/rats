var webpack = require('webpack');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname+'/js',
        filename: "app.bundle.js"
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false,
    //         },
    //         output: {
    //             comments: false,
    //         },
    //     }),
    // ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
};
