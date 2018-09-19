const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { DefinePlugin } = require("webpack")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

const config = {
    name: "react-redux-multi-nprogress-example",
    entry: [
        "./example/index.js"
    ],
    output: {
        path: path.join(__dirname, "..", "dist-example"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [__dirname, path.join(__dirname, "..", "src/")],
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) }),
        new HtmlWebpackPlugin({ inject: "head", title: "React Redux Multi Nprogress" })
    ]
}

if (process.env.NODE_ENV === "development") {
    config.devtool = "cheap-module-source-map"
    config.mode = "development"
}

if (process.env.NODE_ENV !== "development") {
    config.plugins.push(new UglifyJSPlugin())
    config.mode = "production"
}

module.exports = config
