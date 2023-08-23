const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        path: path.join(__dirname, "/dist"), // the bundle output path
        filename: "bundle.js", // the name of the bundle
        publicPath: '/'
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
            '@components': path.resolve(__dirname, 'src/interfaces/components'),
            '@pages': path.resolve(__dirname, 'src/interfaces/pages'),
            '@routes': path.resolve(__dirname, 'src/routes'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@icons': path.resolve(__dirname, 'src/assets/icons'),
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // .js and .jsx files
                exclude: /node_modules/, // excluding the node_modules folder
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/, // to import images and fonts
                loader: "url-loader",
                options: { limit: false },
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',    
                    },
                    {
                        loader: 'webp-loader',
                    }
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            favicon: "./src/assets/icons/servilink_favicon.png",
        }),
    ],
    devServer: {
        port: 3030, // you can change the port
        historyApiFallback: true,
    },
};
