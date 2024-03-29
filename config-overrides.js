const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const { resolve } = require('path')

const target = process.env.REACT_APP_BUILD_TARGET;

// Adds a manifest file to the build according to the current context,
// and deletes files from the build that are not needed in the current context

const getFileManagerPlugin = () => {
  const buildFiles = [
    "index.html",
    "favicon.ico",
    "robots.txt",
    "asset-manifest.json",
  ];
  const manifestFiles = {
    extension: `build/ext-chrome-manifest.json`,
  };

  const fileManagerConfig = {
    events: {
      onStart: {
        copy: [
          { source: `src/${target}/images`, destination: "build/images" },
          { source: `src/${target}/background/background.html`, destination: "build/"},
        ]
      },
      onEnd: {
        copy: [
          {
            source: manifestFiles[target],
            destination: "build/manifest.json",
          },
        ],
        delete: Object.values(manifestFiles).concat(
          buildFiles.map(
            (filename) => `build/${filename}`
          ),
        ),
      },
    },
  }

  return new FileManagerPlugin(fileManagerConfig);
};

module.exports = {
  webpack: function (config) {
    // The webpack configuration will be updated
    // for the production build of the extension.

    // Disable bundle splitting,
    // a single bundle file has to loaded as `content_script`.
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };
    
    // `false`: each entry chunk embeds runtime.
    // The extension is built with a single entry including all JS.
    // https://symfonycasts.com/screencast/webpack-encore/single-runtime-chunk
    config.optimization.runtimeChunk = false;
    
    config.entry = {
      // web extension
      main: `./src/${target}/index.tsx`,
      // background script that has to be referenced in the extension manifest
      background: `./src/${target}/background/background.ts`,
    };
    
    // Filenames of bundles must not include `[contenthash]`, so that they can be referenced in `extension-manifest.json`.
    // The `[name]` is taken from `config.entry` properties, so if we have `main` and `background` as properties, we get 2 output files - main.js and background.js.
    config.output.filename = "[name].js";
    
    // `MiniCssExtractPlugin` is used by the default CRA webpack configuration for
    // extracting CSS into separate files. The plugin has to be removed because it
    // uses `[contenthash]` in filenames of the separate CSS files.
    config.plugins = config
      .plugins
      .filter((plugin) => !(plugin instanceof MiniCssExtractPlugin))
      .concat(
        // `MiniCssExtractPlugin` is used with its default config instead,
        // which doesn't contain `[contenthash]`.
        new MiniCssExtractPlugin(),
        getFileManagerPlugin(),
        new HtmlWebpackPlugin({
          template: './public/extension.html',
          filename: 'extension.html'
        }),
      );

    return config;
  },
};

