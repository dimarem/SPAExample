const path                    = require("path");
const TerserPlugin            = require("terser-webpack-plugin");
const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const BrowserSyncPlugin       = require("browser-sync-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin         = require("vue-loader/lib/plugin");

module.exports = {
    mode: "production", // "production" или "development"
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "[name].js", // или [name].bundle.js, [hash].bundle.js, [name].[hash].js и т.д.
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new TerserPlugin({ // минификатор js
                parallel: true,
                exclude: /(node_modules|bower_components)/
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    devtool: "inline-source-map", // для development 
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new BrowserSyncPlugin({
            host: "localhost",
            port: 3000,
            server: {
                baseDir: ["dist"] // директория для мониторинга файлов
            },
            files: ["./dist/*.html"], // по-ум. browserSync просматривает только файлы из "entry", тут нужно указать доп. файлы для мониторинга
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/i,
                loader: "vue-loader"
            },
            {
                test: /\.js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env"]
                  }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")(),
                                require("postcss-import")()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "resolve-url-loader", // разрешает относительные пути в файлах
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true, // требуется при наличии "resolve-url-loader"
                            data: `$reg: "Roboto-Regular"; $medium: "Roboto-Medium"; $italic: "Roboto-Italic"; $bold: "PlayfairDisplay-SemiBold";  $color: rgb(15, 15, 15); $theme-1: rgb(90, 190, 230); $theme-2: rgb(255, 55, 55);` // передадим sass-переменные в компоненты Vue
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [
                                require("autoprefixer")(),
                                require("postcss-import")()
                            ]
                        }
                    }
                ]
            },
            { 
                test: /\.(png|svg|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "images"
                        }
                    }
                ] 
            },
            { 
                test: /\.(eot|woff2?|ttf)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts",
                        }
                    }
                ] 
            }
        ]
    }
}
