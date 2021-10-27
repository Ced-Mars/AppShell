const HtmlWebpackPlugin = require("html-webpack-plugin");
const deps = require("./package.json").dependencies;
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/server/dist",
    filename: "[name].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js?$/,
        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,
        // To Use babel Loader
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env" /* to transfer any advansed ES to ES5 */,
            "@babel/preset-react",
          ], // to compile react to ES5
        },
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "Shell",
      filename: "remoteEntry.js",
      remotes: {
        RemoteBP: "RemoteBP@http://localhost:4001/remoteEntry.js",
        RemoteSeq: "RemoteSeq@http://localhost:4002/remoteEntry.js"
      },
      shared: {...deps},
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './public/index.html'
    }),
  ],
};
