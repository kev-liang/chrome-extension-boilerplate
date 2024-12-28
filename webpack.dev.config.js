const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: "./pages/popup/Popup.tsx",
    options: "./pages/options/Options.tsx",
    content: "./pages/content/content.ts",
    background: "./chrome-extension/background.ts",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./chrome-extension/manifest.dev.json", to: "./manifest.json" },
      ],
    }),
    ...getHtmlPlugins([
      { template: "./pages/popup/popup.html", name: "popup" },
      { template: "./pages/options/options.html", name: "options" },
    ]),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map((chunk) => {
    const { template, name } = chunk;
    return new HTMLPlugin({
      template,
      filename: `${name}.html`,
      chunks: [name],
    });
  });
}
