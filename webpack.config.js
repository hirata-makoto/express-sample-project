const ExtractTextPlugin = require("extract-text-webpack-plugin")


let devtool = process.env.NODE_ENV === 'production' ? '' : 'inline-source-map'

module.exports = {
    entry: {
        // js: './assets/js/index.js',
        css: './assets/css/index.scss'
    },
    output: {
        filename: './public/js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    use:
                        [
                            {
                                loader: 'css-loader',
                                options: {
                                    url: true,
                                    importLoaders: 2
                                },
                            },
                            {
                                loader: 'sass-loader',
                            }
                        ]
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('../public/css/bundle.css')
    ],
    devtool: devtool,
}
