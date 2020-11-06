const path = require("path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const htmlWebpackPlugin = require("html-webpack-plugin")

// 当前环境是生成环境
const IS_PRO = process.env.NODE_ENV === "production"

const base = {
    entry: path.resolve(__dirname, "src"),
    output: {
        filename: IS_PRO ? "index.min.js" : "index.js",
        path: path.resolve(__dirname, "dist"),
        library: "ColorPicker",
        libraryTarget: "umd",
        libraryExport: "default",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            allowTsInNodeModules: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.scss/,
                use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 500 * 1024, // <=500kb 则使用 base64 （即，希望字体文件一直使用 base64 ，而不单独打包）
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".json", ".sass", ".scss", ".css"],
        alias: {
            "@": path.join(__dirname, "framework"),
            "~": path.join(__dirname, "src"),
        },
    },
}

// development
const dev = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    plugins: [
        // 热模块替换插件：与热替换合用，方便调试 CSS 时 HTML 不会更改
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        // 开启错误提示弹出层
        overlay: true,
        // 服务器启动的根路径
        contentBase: "./dist",
        // 端口号
        port: 3000,
        // 在第一次启动服务时，自动打开浏览器并进行访问
        open: true,
        // 热替换
        hot: true,
        // 即使热替换未生效，浏览器也不自动刷新
        hotOnly: true,
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "public/index.html",
        }),
        new CleanWebpackPlugin(),
    ],
}

// production
const pro = {
    mode: "production",
    devtool: "cheap-module-source-map",
    plugins: [new CleanWebpackPlugin()],
}

module.exports = merge(base, IS_PRO ? pro : dev)
